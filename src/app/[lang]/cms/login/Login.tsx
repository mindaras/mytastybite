import { Translations } from "@i18n/loadTranslations";
import { LoginForm } from "./(components)/LoginForm";
import { CMSPage } from "@common/components/page/CMSPage";
import styles from "./Login.module.scss";
import { Language } from "@types";
import { Title } from "@common/components/text/Title";

interface Props {
  lang: Language;
  translations: Translations;
}

const Login: React.FC<Props> = ({ lang, translations }) => {
  return (
    <CMSPage className={styles.container}>
      <div className={styles.formContainer}>
        <Title className={styles.title} text={translations.cms.login.login} />
        <LoginForm lang={lang} translations={translations} />
      </div>
    </CMSPage>
  );
};

export { Login };
