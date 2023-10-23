import { authenticationError, refreshSession } from "@common/utils/server/auth";
import { initRateLimit } from "@common/utils/server/rateLimit";
import { NextResponse } from "next/server";

export async function POST() {
  const { rateLimit, rateLimitError } = initRateLimit();
  const { allow } = await rateLimit();
  if (!allow) return rateLimitError();

  try {
    const data = await refreshSession();
    if (!data) return authenticationError();
    return NextResponse.json({ data: data.payload.user });
  } catch (err) {
    return new NextResponse(null, { status: 500 });
  }
}
