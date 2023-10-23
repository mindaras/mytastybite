import { Language } from "@types";

const shouldLocalizeRoute = (pathname: string) => {
  const languages = Object.values(Language);

  return !new RegExp(
    `^(${languages.map((lang) => `/${lang}$|/${lang}/`).join("|")})`
  ).test(pathname);
};

export { shouldLocalizeRoute };
