import { initRateLimit } from "@common/utils/server/rateLimit";
import * as Db from "@db";
import { NextRequest, NextResponse } from "next/server";
import removeAccents from "remove-accents";

const parseSearch = (search: string | null) => {
  const value = search?.trim();
  if (!value || value?.split(" ").length < 2) return value;
  return removeAccents(value).toLowerCase().replaceAll(" ", " & ");
};

const limit = 18;

export async function GET(request: NextRequest) {
  const { rateLimit, rateLimitError } = initRateLimit();
  const { allow } = await rateLimit();
  if (!allow) return rateLimitError();

  const { searchParams } = new URL(request.url);
  const search = parseSearch(searchParams.get("search"));
  const page = Number(searchParams.get("page") || 1);

  const whereClause = {
    ...((search && { titleWithoutAccents: { search } }) || {}),
  };

  let response;

  try {
    const db = Db.getArticleDb();
    const articlesPromise = db.findMany({
      ...(Object.keys(whereClause).length ? { where: whereClause } : {}),
      orderBy: { createdAt: "desc" },
      skip: page * limit - limit,
      take: limit,
      select: {
        id: true,
        externalId: true,
        title: true,
        description: true,
        readTime: true,
        createdAt: true,
      },
    });
    const aggregationsPromise = db.aggregate({
      ...(Object.keys(whereClause).length ? { where: whereClause } : {}),
      _count: {
        id: true,
      },
    });
    const [articles, aggregations] = await Promise.all([
      articlesPromise,
      aggregationsPromise,
    ]);
    const count = aggregations?._count?.id;

    response = {
      articles,
      totalPages: Math.ceil(count / limit),
    };
  } catch (err) {
    response = {
      articles: [],
      totalPages: 0,
    };
  }

  return NextResponse.json({ data: response });
}
