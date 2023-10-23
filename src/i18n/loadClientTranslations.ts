import "client-only";

import en from "./client/en.json";
import es from "./client/es.json";
import { getClientLanguage } from "@common/utils/client/getClientLanguage";

const translations = { en, es };

const loadClientTranslations = (lang = getClientLanguage()) => {
  return translations[lang];
};

export type ClientTranslations = ReturnType<typeof loadClientTranslations>;

export { loadClientTranslations };
