import { initRateLimit } from "@common/utils/server/rateLimit";
import { getRecipeDb } from "@db";
import { NextRequest, NextResponse } from "next/server";

interface GetRequestData {
  params: { id: string };
}

export async function GET(_: NextRequest, { params }: GetRequestData) {
  const { rateLimit, rateLimitError } = initRateLimit();
  const { allow } = await rateLimit();
  if (!allow) return rateLimitError();

  const { id: idParam } = params;
  const id = parseInt(idParam);
  let recipe;

  if (!id) return new NextResponse(null, { status: 404 });

  try {
    const db = getRecipeDb();
    recipe = await db.findFirst({ where: { id } });
  } catch (err) {
    recipe = null;
  }

  return NextResponse.json({ data: recipe });
}
