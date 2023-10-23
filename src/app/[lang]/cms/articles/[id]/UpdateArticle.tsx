import * as types from "@types";
import styles from "./UpdateArticle.module.scss";
import { BackButton } from "@common/components/backButton/BackButton";
import { notFound } from "next/navigation";
import { api } from "@common/utils/api/server";
import { UpdateArticleForm } from "./(components)/UpdateArticleForm";
import { CMSPage } from "@common/components/page/CMSPage";

interface Props {
  id: string;
  lang: types.Language;
}

/* @ts-expect-error Async Server Component */
const UpdateArticle: React.FC<Props> = async ({ id, lang }) => {
  const article = await api.get<types.Article>(`/articles/${id}`);

  if (!article) return notFound();

  return (
    <CMSPage>
      <BackButton className={styles.backButton} text="Back" />
      <UpdateArticleForm lang={lang} article={article} />
    </CMSPage>
  );
};

export { UpdateArticle };
