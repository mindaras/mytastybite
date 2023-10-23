import styles from "./Layout.module.scss";
import { Navigation, NavigationLinks } from "../navigation/Navigation";
import { HangingLoaderObserver } from "../HangingLoaderObserver";
import { Translations, loadTranslations } from "@i18n/loadTranslations";
import { Language } from "@types";

const getNavigationLinks = (
  lang: string,
  translations: Translations
): NavigationLinks => {
  return [
    {
      to: `/${lang}`,
      label: translations.navigation.home,
      searchable: true,
      searchFallback: true,
    },
    { to: `/${lang}/categories`, label: translations.navigation.categories },
    { to: `/${lang}/diets`, label: translations.navigation.diets },
    {
      to: `/${lang}/articles`,
      label: translations.navigation.blog,
      searchable: true,
    },
    { to: `/${lang}/contact`, label: translations.navigation.contact },
  ];
};

interface Props {
  lang: Language;
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ lang, children }) => {
  const translations = loadTranslations(lang);
  const navigationLinks = getNavigationLinks(lang, translations);

  return (
    <>
      <Navigation
        lang={lang}
        translations={translations}
        logoSrc="/images/logo.jpg"
        mobileLogoSrc="/images/mobileLogo.jpg"
        links={navigationLinks}
      />
      <main className={styles.container}>{children}</main>
      <HangingLoaderObserver />
    </>
  );
};

export { Layout };
