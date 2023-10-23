import { appendLanguageToRequestHeaders } from "@common/i18n/middleware/appendLanguageToRequestHeaders";
import { shouldLocalizeRoute } from "@common/i18n/middleware/shouldLocalizeRoute";
import { config } from "@config";
import { NextRequest, NextResponse } from "next/server";

const clientMiddlware = (request: NextRequest) => {
  const pathname = request.nextUrl.pathname;

  if (shouldLocalizeRoute(pathname)) {
    return NextResponse.redirect(new URL(`/en/${pathname}`, config.origin));
  }

  const requestHeaders = appendLanguageToRequestHeaders(request);
  requestHeaders.set("x-path", pathname);
  return NextResponse.next({ request: { headers: requestHeaders } });
};

export { clientMiddlware };
