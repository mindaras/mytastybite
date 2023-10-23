import { toKb, toMb, validateFileSize } from "@common/utils/file";
import { authenticate, authenticationError } from "@common/utils/server/auth";
import { bucket } from "@common/utils/server/bucket";
import {
  error400Response,
  error500Response,
  errorResponse,
} from "@common/utils/server/errors";
import { validateBufferSize } from "@common/utils/server/file";
import { generateCompressedAndPreviewBuffers } from "@common/utils/server/image";
import { initRateLimit } from "@common/utils/server/rateLimit";
import { withoutAccents } from "@common/utils/server/text";
import { db } from "@db";
import { Language } from "@types";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { LanguageGroupedArticleData } from "src/app/[lang]/cms/articles/create/(components)/CreateArticleForm";

export async function POST(request: NextRequest) {
  const { rateLimit, rateLimitError } = initRateLimit();
  const { allow } = await rateLimit();
  if (!allow) return rateLimitError();
  const authResponse = await authenticate({ handleRefresh: true });
  if (!authResponse?.user) return authenticationError();

  const data = (await request.formData()) as any;
  const articles = JSON.parse(
    data.get("articles")
  ) as LanguageGroupedArticleData;
  const image = data.get("image") as File;

  for (const lang of Object.values(Language)) {
    if (!articles[lang].title || !articles[lang].body) {
      return error400Response({ message: "Missing data" });
    }
  }

  if (!(image instanceof Object)) {
    return error400Response({ message: "Missing image" });
  }

  try {
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
        !validateBufferSize({ buffer: previewBuffer, size: 30, units: "kb" })
      ) {
        return errorResponse({
          message: `Compressed preview image size is too big: ${toKb(
            previewBuffer.byteLength
          ).toFixed(1)}kb (maximum 30kb)`,
          status: 400,
        });
      }

      const data = {
        externalId: randomUUID(),
        title: articles.en.title,
        titleWithoutAccents: withoutAccents({
          text: articles.en.title,
          lowerCase: true,
        }),
        description: articles.en.description,
        body: articles.en.body,
        readTime: articles.en.readTime,
      };

      const enArticle = await db.article_en.create({ data });

      await Promise.all([
        db.article_es.create({
          data: {
            id: enArticle.id,
            externalId: enArticle.externalId,
            title: articles.es.title,
            titleWithoutAccents: withoutAccents({
              text: articles.es.title,
              lowerCase: true,
            }),
            description: articles.es.description,
            body: articles.es.body,
            readTime: articles.es.readTime,
          },
        }),
      ]);

      await Promise.all([
        bucket.upload({
          filename: `images/articles/${enArticle.externalId}.jpg`,
          buffer: imageBuffer,
        }),
        bucket.upload({
          filename: `images/articlesPreview/${enArticle.externalId}.jpg`,
          buffer: previewBuffer,
        }),
      ]);
    }

    return new NextResponse(null, { status: 204 });
  } catch (err) {
    return error500Response({ message: (err as Error)?.message });
  }
}
