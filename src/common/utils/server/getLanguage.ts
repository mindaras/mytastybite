import "server-only";
import { config } from "@config";
import { Language } from "@types";
import { headers } from "next/headers";

const getLanguage = (fallback = config.i18n.mainLanguage) => {
  return (headers().get("x-lang") || fallback) as Language;
};

export { getLanguage };
