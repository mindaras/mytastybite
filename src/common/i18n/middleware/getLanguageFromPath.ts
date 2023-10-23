import { config } from "@config";
import { Language } from "@types";

const getLanguageFromPath = (
  pathname: string,
  fallback = config.i18n.mainLanguage
) => {
  const languages = Object.values(Language);
  return (
    languages.find((lang) => new RegExp(`^\/${lang}`).test(pathname)) ||
    fallback
  );
};

export { getLanguageFromPath };
