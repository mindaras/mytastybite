import { Metadata, ResolvingMetadata } from "next";
import { Recipe } from "./Recipe";
import * as types from "@types";
import { config } from "@config";
import { api } from "@common/utils/api/server";
import { loadTranslations } from "@i18n/loadTranslations";
import { Language } from "@types";
import { getDefaultMetadata } from "@common/components/metadata/metadata";

interface Props {
  params: { id: string; lang: Language };
}

const RecipePage: React.FC<Props> = ({ params: { id, lang } }) => {
  const translations = loadTranslations(lang);
  return <Recipe id={id} translations={translations} />;
};

export default RecipePage;

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const recipe = await api.get<types.Recipe>(`/recipes/${params.id}`);
  const defaultMetadata = getDefaultMetadata({ lang: params.lang });
  const title = `${recipe?.title} | My Tasty Bite`;
  const description = recipe?.description;

  return {
    title,
    description,
    openGraph: {
      ...defaultMetadata.openGraph,
      title,
      description,
      images: [`${config.origin}/images/recipes/${recipe?.externalId}.jpg`],
      url: `${config.origin}/recipes/${params.id}`,
      type: "article",
    },
  };
};
