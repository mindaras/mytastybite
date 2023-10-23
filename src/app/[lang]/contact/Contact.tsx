import { Title } from "@common/components/text/Title";
import { ContactForm } from "./(components)/ContactForm";
import { Translations } from "@i18n/loadTranslations";
import { Page } from "@common/components/page/Page";
import styles from "./Contact.module.scss";

interface Props {
  translations: Translations;
}

const Contact: React.FC<Props> = ({ translations }) => {
  return (
    <Page translations={translations}>
      <Title text={translations.contact.title} />
      <p className={styles.description}>{translations.contact.message}</p>
      <ContactForm translations={translations} />
    </Page>
  );
};

export { Contact };
