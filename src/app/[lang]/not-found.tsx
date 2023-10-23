import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { Error404 } from "@common/components/error/Error404";
import { Page } from "@common/components/page/Page";
import styles from "@common/components/error/Error.module.scss";
import { loadTranslations } from "@i18n/loadTranslations";
import { getLanguage } from "@common/utils/server/getLanguage";

config.autoAddCss = false;

const NotFoundPage = () => {
  const lang = getLanguage();
  const translations = loadTranslations(lang);

  return (
    <Page className={styles.container} translations={translations}>
      <Error404
        imageSrc="/images/notFound.jpg"
        imageAlt={translations.notFound.imageAlt}
        title={translations.notFound.title}
        buttonText={translations.notFound.button}
        preserveLang
      />
    </Page>
  );
};

export default NotFoundPage;
