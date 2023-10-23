import "client-only";

import { Language } from "@types";
import { config } from "@config";

const getClientLanguage = (fallback = config.i18n.mainLanguage) => {
  return (window.location.pathname.substring(1, 3) || fallback) as Language;
};

export { getClientLanguage };
