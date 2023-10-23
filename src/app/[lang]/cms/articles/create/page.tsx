import { CreateArticle } from "./CreateArticle";
import { Language } from "@types";

interface Props {
  params: { lang: Language };
}

const CreateArticlePage: React.FC<Props> = ({ params: { lang } }) => {
  return <CreateArticle lang={lang} />;
};

export default CreateArticlePage;
