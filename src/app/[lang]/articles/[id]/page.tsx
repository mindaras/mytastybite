import { Metadata } from "next";
import { Article } from "./Article";
import * as types from "@types";
import { config } from "@config";
import { api } from "@common/utils/api/server";
import { loadTranslations } from "@i18n/loadTranslations";
import { Language } from "@types";
import { getDefaultMetadata } from "@common/components/metadata/metadata";

interface Props {
  params: { id: string; lang: Language };
}

const ArticlePage: React.FC<Props> = ({ params: { id, lang } }) => {
  const translations = loadTranslations(lang);
  return <Article id={id} translations={translations} />;
};

export default ArticlePage;

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const article = await api.get<types.Article>(`/articles/${params.id}`);
  const defaultMetadata = getDefaultMetadata({ lang: params.lang });
  const title = `${article?.title} | My Tasty Bite`;
  const description = article?.description;

  return {
    title,
    description,
    openGraph: {
      ...defaultMetadata.openGraph,
      title,
      description,
      images: [`${config.origin}/images/articles/${article?.externalId}.jpg`],
      url: `${config.origin}/articles/${params.id}`,
      type: "article",
    },
  };
};
