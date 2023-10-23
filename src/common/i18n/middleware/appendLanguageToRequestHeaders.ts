import { NextRequest } from "next/server";
import { getLanguageFromPath } from "./getLanguageFromPath";
import { config } from "@config";

const appendLanguageToRequestHeaders = (
  request: NextRequest,
  fallbackLang = config.i18n.mainLanguage
) => {
  const pathname = request.nextUrl.pathname;
  const lang = getLanguageFromPath(pathname, fallbackLang);
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-lang", lang);
  return requestHeaders;
};

export { appendLanguageToRequestHeaders };
