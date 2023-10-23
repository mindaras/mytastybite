import type { NextRequest } from "next/server";
import { apiMiddleware } from "./middleware/apiMiddleware";
import { clientMiddlware } from "./middleware/clientMiddleware";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (/^\/api/.test(pathname)) return apiMiddleware();
  return clientMiddlware(request);
}

export const config = {
  matcher:
    "/((?!_next|favicon.ico|robots.txt|sitemap.xml|ads.txt|images|auth/refresh).*)", // ignores these routes
};
