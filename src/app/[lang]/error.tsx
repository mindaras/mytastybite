"use client";

import { Error } from "@common/components/error/Error";
import { Page } from "@common/components/page/Page";
import styles from "@common/components/error/Error.module.scss";
import { loadClientTranslations } from "@i18n/loadClientTranslations";

const ErrorPage: React.FC = () => {
  const translations = loadClientTranslations();

  return (
    <Page className={styles.container} translations={translations as any}>
      <Error
        imageSrc="/images/error.jpg"
        imageAlt={translations.error.imageAlt}
        title={translations.error.title}
        buttonText={translations.error.button}
        preserveLang
      />
    </Page>
  );
};

export default ErrorPage;
