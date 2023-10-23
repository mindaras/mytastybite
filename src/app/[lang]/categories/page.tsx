import { Metadata } from "next";
import { Categories } from "./Categories";
import { loadTranslations } from "@i18n/loadTranslations";
import { Language } from "@types";
import { getDefaultMetadata } from "@common/components/metadata/metadata";

interface Params {
  lang: Language;
}

interface Props {
  params: {
    lang: Language;
  };
}

const CategoriesPage: React.FC<Props> = ({ params: { lang } }) => {
  const translations = loadTranslations(lang);
  return <Categories lang={lang} translations={translations} />;
};

export default CategoriesPage;

interface GenerateMetadataProps {
  params: Params;
}

export const generateMetadata = ({
  params: { lang },
}: GenerateMetadataProps): Metadata => {
  const translations = loadTranslations(lang);
  const defaultMetadata = getDefaultMetadata({ lang });

  return {
    title: `My Tasty Bite | ${translations.metadata.categories.title}`,
    description: translations.metadata.categories.description,
    openGraph: {
      ...defaultMetadata.openGraph,
      description: translations.metadata.categories.description,
    },
  };
};
