import { toKb, toMb, validateFileSize } from "@common/utils/file";
import { authenticate, authenticationError } from "@common/utils/server/auth";
import { bucket } from "@common/utils/server/bucket";
import {
  error400Response,
  error404Response,
  error500Response,
  errorResponse,
} from "@common/utils/server/errors";
import { validateBufferSize } from "@common/utils/server/file";
import { generateCompressedAndPreviewBuffers } from "@common/utils/server/image";
import { initRateLimit } from "@common/utils/server/rateLimit";
import { withoutAccents } from "@common/utils/server/text";
import { deleteAcrossAllLanguages, getArticleDb } from "@db";
import { Language } from "@types";
import { NextRequest, NextResponse } from "next/server";
import { ArticleTextData } from "src/app/[lang]/cms/articles/[id]/(components)/UpdateArticleForm";

interface RequestParams {
  params: { id: string };
}

export async function PATCH(request: NextRequest, { params }: RequestParams) {
  const { rateLimit, rateLimitError } = initRateLimit();
  const { allow } = await rateLimit();
  if (!allow) return rateLimitError();
  const authResponse = await authenticate({ handleRefresh: true });
  if (!authResponse?.user) return authenticationError();
  const id = parseInt(params.id);

  const data = (await request.formData()) as any;
  const { title, description, readTime, body } = JSON.parse(
    data.get("article")
  ) as ArticleTextData;
  const language = data.get("language") as Language;
  const image = data.get("image") as File;

  if (!id) return error400Response();

  try {
    const db = getArticleDb(language);
    const article = await db.findFirst({ where: { id } });

    if (!article) return error404Response();

    const { externalId } = article;
    const updatedArticle = await db.update({
      where: { id },
      data: {
        title,
        titleWithoutAccents: withoutAccents({
          text: title,
          lowerCase: true,
        }),
        description,
        readTime,
        body,
      },
    });

    if (image instanceof Object) {
      if (!validateFileSize({ file: image, size: 3, units: "mb" })) {
        return errorResponse({
          message: `Image size is too big: ${toMb(image.size).toFixed(
            1
          )}mb (maximum 3mb)`,
          status: 400,
        });
      }

      const { imageBuffer, previewBuffer } =
        await generateCompressedAndPreviewBuffers(image);

      if (
        !validateBufferSize({ buffer: imageBuffer, size: 400, units: "kb" })
      ) {
        return errorResponse({
          message: `Compressed image size is too big: ${toKb(
            imageBuffer.byteLength
          ).toFixed(1)}kb (maximum 300kb)`,
          status: 400,
        });
      }

      if (
        !validateBufferSize({ buffer: previewBuffer, size: 20, units: "kb" })
      ) {
        return errorResponse({
          message: `Compressed preview image size is too big: ${toKb(
            previewBuffer.byteLength
          ).toFixed(1)}kb (maximum 20kb)`,
          status: 400,
        });
      }

      await Promise.all([
        bucket.upload({
          filename: `images/articles/${externalId}.jpg`,
          buffer: imageBuffer,
        }),
        bucket.upload({
          filename: `images/articlesPreview/${externalId}.jpg`,
          buffer: previewBuffer,
        }),
      ]);
    }

    return NextResponse.json({ data: updatedArticle });
  } catch (err) {
    return error500Response({ message: (err as Error)?.message });
  }
}

export async function DELETE(_: NextRequest, { params }: RequestParams) {
  const { rateLimit, rateLimitError } = initRateLimit();
  const { allow } = await rateLimit();
  if (!allow) return rateLimitError();
  const authResponse = await authenticate({ handleRefresh: true });
  if (!authResponse?.user) return authenticationError();
  const id = parseInt(params.id);

  if (!id) return error400Response();

  try {
    const db = getArticleDb();
    const article = await db.findFirst({ where: { id } });

    if (!article) return error404Response();

    const { externalId } = article;

    await deleteAcrossAllLanguages({ table: "article", where: { id } });

    await Promise.all([
      bucket.del({ filename: `images/articles/${externalId}.jpg` }),
      bucket.del({ filename: `images/articlesPreview/${externalId}.jpg` }),
    ]);

    return new NextResponse(null, { status: 204 });
  } catch (err) {
    return error500Response({ message: (err as Error)?.message });
  }
}
