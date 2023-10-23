import "server-only";

import en from "./en.json";
import es from "./es.json";
import { getLanguage } from "@common/utils/server/getLanguage";

const translations = { en, es };

const loadTranslations = (lang = getLanguage()) => {
  return translations[lang];
};

export type Translations = ReturnType<typeof loadTranslations>;

export { loadTranslations };
