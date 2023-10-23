import { authenticate, authenticationError } from "@common/utils/server/auth";
import { getCacheClient } from "@common/utils/server/cache";
import { error500Response } from "@common/utils/server/errors";
import {
  BLOCKLIST_KEY,
  CRAWLERS_KEY,
  NO_IP_REQUEST_KEY,
  initRateLimit,
} from "@common/utils/server/rateLimit";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { rateLimit, rateLimitError } = initRateLimit();
  const { allow } = await rateLimit();
  if (!allow) return rateLimitError();
  const authResponse = await authenticate({ handleRefresh: true });
  if (!authResponse?.user) return authenticationError();

  try {
    const cache = await getCacheClient();
    const [blockList, crawlers, noIpCount] = await Promise.all([
      cache.get(BLOCKLIST_KEY),
      cache.get(CRAWLERS_KEY),
      cache.get(NO_IP_REQUEST_KEY),
    ]);

    return NextResponse.json({
      data: {
        blockList: JSON.parse(blockList || "{}"),
        crawlers: JSON.parse(crawlers || "{}"),
        noIpCount: parseInt(noIpCount || "0"),
      },
    });
  } catch (err) {
    return error500Response();
  }
}
