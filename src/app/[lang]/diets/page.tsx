import { Metadata } from "next";
import { Diets } from "./Diets";
import { Language } from "@types";
import { loadTranslations } from "@i18n/loadTranslations";
import { getDefaultMetadata } from "@common/components/metadata/metadata";

interface Params {
  lang: Language;
}

interface Props {
  params: Params;
}

const DietsPage: React.FC<Props> = ({ params: { lang } }) => {
  const translations = loadTranslations(lang);
  return <Diets lang={lang} translations={translations} />;
};

export default DietsPage;

interface GenerateMetadataProps {
  params: Params;
}

export const generateMetadata = ({
  params: { lang },
}: GenerateMetadataProps): Metadata => {
  const translations = loadTranslations(lang);
  const defaultMetadata = getDefaultMetadata({ lang });

  return {
    title: `My Tasty Bite | ${translations.metadata.diets.title}`,
    description: translations.metadata.diets.description,
    openGraph: {
      ...defaultMetadata.openGraph,
      description: translations.metadata.diets.description,
    },
  };
};
