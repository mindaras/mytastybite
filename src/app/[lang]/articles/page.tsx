import { Language, QueryParams } from "src/types";
import { loadTranslations } from "@i18n/loadTranslations";
import { Articles } from "./Articles";
import { Metadata } from "next";
import { getDefaultMetadata } from "@common/components/metadata/metadata";

interface Params {
  lang: Language;
}

interface Props {
  searchParams?: QueryParams;
  params: Params;
}

const ArticlesPage: React.FC<Props> = ({ searchParams, params: { lang } }) => {
  const translations = loadTranslations(lang);

  return (
    <Articles
      searchParams={searchParams}
      lang={lang}
      translations={translations}
    />
  );
};

export default ArticlesPage;

interface GenerateMetadataProps {
  params: Params;
}

export const generateMetadata = ({
  params: { lang },
}: GenerateMetadataProps): Metadata => {
  const translations = loadTranslations(lang);
  const defaultMetadata = getDefaultMetadata({ lang });

  return {
    title: `My Tasty Bite | ${translations.metadata.blog.title}`,
    description: translations.metadata.blog.description,
    openGraph: {
      ...defaultMetadata.openGraph,
      title: `My Tasty Bite | ${translations.metadata.blog.title}`,
      description: translations.metadata.blog.description,
    },
  };
};
