import { Language, QueryParams } from "src/types";
import { loadTranslations } from "@i18n/loadTranslations";
import { Articles } from "./Articles";

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
