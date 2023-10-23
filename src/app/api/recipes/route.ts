import { initRateLimit } from "@common/utils/server/rateLimit";
import { getRecipeDb } from "@db";
import { Category, Diet } from "@types";
import { NextRequest, NextResponse } from "next/server";
import removeAccents from "remove-accents";

const parseSearch = (search: string | null) => {
  const value = search?.trim();
  if (!value || value?.split(" ").length < 2) return value;
  return removeAccents(value).toLowerCase().replaceAll(" ", " & ");
};

const limit = 32;

export async function GET(request: NextRequest) {
  const { rateLimit, rateLimitError } = initRateLimit();
  const { allow } = await rateLimit();
  if (!allow) return rateLimitError();

  const { searchParams } = new URL(request.url);
  const search = parseSearch(searchParams.get("search"));
  const category = searchParams.get("category") as Category;
  const diet = searchParams.get("diet") as Diet;
  const page = Number(searchParams.get("page") || 1);

  const whereClause = {
    ...((category && { category }) || {}),
    ...((diet && { diet }) || {}),
    ...((search && { titleWithoutAccents: { search } }) || {}),
  };

  let response;

  try {
    const db = getRecipeDb();
    const recipesPromise = db.findMany({
      ...(Object.keys(whereClause).length ? { where: whereClause } : {}),
      orderBy: { createdAt: "desc" },
      skip: page * limit - limit,
      take: limit,
      select: { id: true, externalId: true, title: true, duration: true },
    });
    const aggregationsPromise = db.aggregate({
      ...(Object.keys(whereClause).length ? { where: whereClause } : {}),
      _count: {
        id: true,
      },
    });
    const [recipes, aggregations] = await Promise.all([
      recipesPromise,
      aggregationsPromise,
    ]);
    const count = aggregations?._count?.id;

    response = {
      recipes,
      totalPages: Math.ceil(count / limit),
    };
  } catch (err) {
    response = {
      recipes: [],
      totalPages: 0,
    };
  }

  return NextResponse.json({ data: response });
}
