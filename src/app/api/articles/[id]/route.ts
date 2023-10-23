import { initRateLimit } from "@common/utils/server/rateLimit";
import { getArticleDb } from "@db";
import { NextRequest, NextResponse } from "next/server";

interface GetRequestData {
  params: { id: string };
}

export async function GET(_: NextRequest, { params }: GetRequestData) {
  const { rateLimit, rateLimitError } = initRateLimit();
  const { allow } = await rateLimit();
  if (!allow) return rateLimitError();
  const id = parseInt(params.id);
  let article;

  if (!id) return new NextResponse(null, { status: 404 });

  try {
    const db = getArticleDb();
    article = await db.findFirst({ where: { id } });
  } catch (err) {
    article = null;
  }

  return NextResponse.json({ data: article });
}
