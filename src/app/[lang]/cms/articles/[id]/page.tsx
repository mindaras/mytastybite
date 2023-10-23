import { UpdateArticle } from "./UpdateArticle";
import { Language } from "@types";

interface Props {
  params: { lang: Language; id: string };
}

const UpdateArticlePage: React.FC<Props> = ({ params: { lang, id } }) => {
  return <UpdateArticle lang={lang} id={id} />;
};

export default UpdateArticlePage;
