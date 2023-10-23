import * as types from "@types";
import styles from "./Article.module.scss";
import { Image } from "@common/components/image/Image";
import { BackButton } from "@common/components/backButton/BackButton";
import { notFound } from "next/navigation";
import { Title } from "@common/components/text/Title";
import { config } from "@config";
import { Page } from "@common/components/page/Page";
import { api } from "@common/utils/api/server";
import { Translations } from "@i18n/loadTranslations";
import { toISODate } from "@common/utils/date";

interface Props {
  id: string;
  translations: Translations;
}

/* @ts-expect-error Async Server Component */
const Article: React.FC<Props> = async ({ id, translations }) => {
  const article = await api.get<types.Article>(`/articles/${id}`);

  if (!article) return notFound();

  return (
    <Page translations={translations}>
      <BackButton className={styles.backButton} text={translations.back} />
      <div className={styles.container}>
        <div>
          <div className={styles.metadata}>
            <span>{article.readTime}</span>
            <span>{toISODate(article.createdAt)}</span>
          </div>
          <Title className={styles.title} text={article.title} />
          <Image
            className={styles.image}
            src={`${config.images.origin}/articles/${article.externalId}.jpg`}
            previewSrc={`${config.images.origin}/articlesPreview/${article.externalId}.jpg`}
            alt={article.title}
          />
          <div
            className={styles.body}
            dangerouslySetInnerHTML={{ __html: article.body }}
          />
        </div>
      </div>
    </Page>
  );
};

export { Article };
