import styles from "./Layout.module.scss";
import { NavigationLinks } from "../navigation/Navigation";
import { HangingLoaderObserver } from "../HangingLoaderObserver";
import { Translations, loadTranslations } from "@i18n/loadTranslations";
import { Language } from "@types";
import { SideNavigation } from "../navigation/SideNavigation";
import { isCMSLogin } from "@common/utils/server/path";
import { Optional } from "../Optional";
import { AuthGuard } from "../auth/AuthGuard";
import { ModalProvider } from "../modal/contexts/ModalProvider";
import { Modal } from "../modal/Modal";

const getNavigationLinks = (
  lang: string,
  translations: Translations
): NavigationLinks => {
  return [
    {
      to: `/${lang}/cms`,
      label: translations.cms.navigation.dashboard,
    },
    {
      to: `/${lang}/cms/articles`,
      label: translations.cms.navigation.articles,
    },
  ];
};

interface Props {
  lang: Language;
  children: React.ReactNode;
}

const CMSLayout: React.FC<Props> = ({ lang, children }) => {
  const translations = loadTranslations(lang);
  const navigationLinks = getNavigationLinks(lang, translations);

  return (
    <>
      <AuthGuard loginRoute={`/${lang}/cms/login`} refreshRoute="/auth/refresh">
        <ModalProvider>
          <Optional if={!isCMSLogin()}>
            <SideNavigation
              lang={lang}
              translations={translations}
              logoSrc="/images/logo.jpg"
              mobileLogoSrc="/images/mobileLogo.jpg"
              links={navigationLinks}
            />
          </Optional>
          <main className={styles.container}>{children}</main>
          <Modal />
        </ModalProvider>
      </AuthGuard>
      <HangingLoaderObserver />
    </>
  );
};

export { CMSLayout };
