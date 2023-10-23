import { Metadata } from "next";
import { Contact } from "./Contact";
import { Language } from "@types";
import { loadTranslations } from "@i18n/loadTranslations";
import { getDefaultMetadata } from "@common/components/metadata/metadata";

interface Params {
  lang: Language;
}

interface Props {
  params: {
    lang: Language;
  };
}

const ContactPage: React.FC<Props> = ({ params: { lang } }) => {
  const translations = loadTranslations(lang);
  return <Contact translations={translations} />;
};

export default ContactPage;

interface GenerateMetadataProps {
  params: Params;
}

export const generateMetadata = ({
  params: { lang },
}: GenerateMetadataProps): Metadata => {
  const translations = loadTranslations(lang);
  const defaultMetadata = getDefaultMetadata({ lang });

  return {
    title: `My Tasty Bite | ${translations.metadata.contact.title}`,
    description: translations.metadata.contact.description,
    openGraph: {
      ...defaultMetadata.openGraph,
      description: translations.metadata.contact.description,
    },
  };
};
