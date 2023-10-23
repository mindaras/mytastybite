import { Language, QueryParams } from "src/types";
import { Recipes } from "./Recipes";
import { loadTranslations } from "@i18n/loadTranslations";

interface Props {
  searchParams?: QueryParams;
  params: {
    lang: Language;
  };
}

const RecipesPage: React.FC<Props> = ({ searchParams, params: { lang } }) => {
  const translations = loadTranslations(lang);

  return (
    <Recipes
      searchParams={searchParams}
      lang={lang}
      translations={translations}
    />
  );
};

export default RecipesPage;
