import { Translations } from "@i18n/loadTranslations";
import styles from "./Footer.module.scss";

interface Props {
  translations: Translations;
}

const Footer: React.FC<Props> = ({ translations }) => {
  return (
    <footer className={styles.footer}>{translations.footer.coprights}</footer>
  );
};

export { Footer };
