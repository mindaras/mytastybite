import * as types from "@types";
import styles from "./CreateArticle.module.scss";
import { BackButton } from "@common/components/backButton/BackButton";
import { CMSPage } from "@common/components/page/CMSPage";
import { CreateArticleForm } from "./(components)/CreateArticleForm";

interface Props {
  lang: types.Language;
}

/* @ts-expect-error Async Server Component */
const CreateArticle: React.FC<Props> = async ({ lang }) => {
  return (
    <CMSPage>
      <BackButton className={styles.backButton} text="Back" />
      <CreateArticleForm lang={lang} />
    </CMSPage>
  );
};

export { CreateArticle };
