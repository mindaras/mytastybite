import { Translations } from "@i18n/loadTranslations";
import { Footer } from "../footer/Footer";
import styles from "./Page.module.scss";

interface Props {
  children: React.ReactNode;
  translations: Translations;
  className?: string;
}

const Page: React.FC<Props> = ({ className, translations, children }) => {
  return (
    <div className={styles.page}>
      <div className={className}>{children}</div>
      <Footer translations={translations} />
    </div>
  );
};

export { Page };
