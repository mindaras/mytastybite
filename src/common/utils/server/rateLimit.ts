import { NextResponse } from "next/server";
import { headers as getHeaders } from "next/headers";
import requestIp from "request-ip";
import { getCacheClient } from "./cache";
import { isCrawlerIP, isCrawlerUA } from "./crawlers";
import { config } from "@config";

const RATE_LIMIT_KEY = `${config.app.name}:rateLimit:ip`;
export const NO_IP_REQUEST_KEY = `${config.app.name}:rateLimit:noIpCount`;
export const BLOCKLIST_KEY = `${config.app.name}:rateLimit:blocklist`;
export const CRAWLERS_KEY = `${config.app.name}:rateLimit:crawlers`;
const LIMIT = 30;
const TIME_WINDOW = 60; // seconds

interface Token {
  remaining: number;
  timestamp: number;
}

const getSecondsPassed = (beginning: number) => {
  return Math.floor(Math.abs((beginning - new Date().getTime()) / 1000));
};

interface TokensPayload {
  remaining: number;
  timestamp: number;
}

const resetTokens = async (key: string) => {
  const cache = await getCacheClient();

  return await cache.set(
    key,
    JSON.stringify({
      remaining: LIMIT - 1,
      timestamp: new Date().getTime(),
    }),
    { EX: TIME_WINDOW }
  );
};

interface DecrementTokensArgs {
  key: string;
  payload: TokensPayload;
  expires: number;
}

const decrementTokens = async ({
  key,
  payload,
  expires,
}: DecrementTokensArgs) => {
  const cache = await getCacheClient();

  return await cache.set(
    key,
    JSON.stringify({
      remaining: payload.remaining - 1,
      timestamp: payload.timestamp,
    }),
    { EX: expires }
  );
};

const updateCounter = async (key: string, id: string) => {
  const cache = await getCacheClient();
  const payload = await cache.get(key);
  const data = JSON.parse(payload || "{}");

  if (data[id]) data[id]++;
  else data[id] = 1;

  cache.set(key, JSON.stringify(data));
};

interface RateLimitResponse {
  allow: boolean;
}

interface InitRateLimitProps {
  allowlist?: string[];
  blocklist?: string[];
}

const initRateLimit = (params = {} as InitRateLimitProps) => {
  const { allowlist, blocklist } = params;

  const rateLimit = async (): Promise<RateLimitResponse> => {
    const headers = Object.fromEntries(getHeaders());
    const userAgent = headers["user-agent"];
    const crawlerUA = isCrawlerUA(userAgent);

    if (crawlerUA) {
      updateCounter(CRAWLERS_KEY, crawlerUA);
      return { allow: true };
    }

    const ip = requestIp.getClientIp({ headers } as any);
    const crawlerIp = isCrawlerIP(ip);

    if (crawlerIp) {
      updateCounter(CRAWLERS_KEY, crawlerIp);
      return { allow: true };
    }

    const cache = await getCacheClient();

    if (!ip) {
      cache.incr(NO_IP_REQUEST_KEY);
      return { allow: true };
    }

    if (allowlist?.includes(ip)) return { allow: true };
    if (blocklist?.includes(ip)) return { allow: false };

    const key = `${RATE_LIMIT_KEY}:${ip}`;
    const response = await cache.get(key);

    if (!response) {
      await resetTokens(key);
      return { allow: true };
    }

    const payload = JSON.parse(response) as Token;
    const { timestamp, remaining } = payload;
    const secondsPassed = getSecondsPassed(timestamp);

    if (secondsPassed >= TIME_WINDOW) {
      await resetTokens(key);
      return { allow: true };
    }

    if (remaining > 0) {
      await decrementTokens({
        key,
        payload,
        expires: TIME_WINDOW - secondsPassed,
      });
      return { allow: true };
    }

    updateCounter(BLOCKLIST_KEY, ip);

    return { allow: false };
  };

  const rateLimitError = () => {
    return new NextResponse(null, {
      status: 429,
      statusText: "Too many requests",
    });
  };

  return { rateLimit, rateLimitError };
};

export { initRateLimit };
