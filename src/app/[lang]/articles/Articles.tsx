import styles from "./Articles.module.scss";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { Pagination } from "@common/components/pagination/Pagination";
import * as types from "@types";
import { Optional } from "@common/components/Optional";
import { NoData } from "@common/components/NoData/NoData";
import { toQueryString } from "@common/mappers/toQueryString";
import { Page } from "@common/components/page/Page";
import { api } from "@common/utils/api/server";
import { Translations } from "@i18n/loadTranslations";
import { ArticleCard } from "@common/components/card/ArticleCard";
import { config } from "@config";

interface ArticlesResponse {
  articles: types.Articles;
  totalPages: number;
}

interface Props {
  searchParams?: types.QueryParams;
  lang: string;
  translations: Translations;
}

/* @ts-expect-error Async Server Component */
const Articles: React.FC<Props> = async ({
  searchParams,
  lang,
  translations,
}) => {
  const data = await api.get<ArticlesResponse>(
    `/articles${toQueryString(searchParams)}`
  );

  return (
    <Page className={styles.container} translations={translations}>
      <Optional if={!data?.articles?.length}>
        <NoData
          imageSrc="/images/notFound.jpg"
          imageAlt={translations.recipes.imageAlt}
          title={translations.noData}
        />
      </Optional>
      <Optional data={data?.articles}>
        {(articles: types.Articles) => (
          <>
            <div className={styles.articles}>
              {articles.map((article) => (
                <ArticleCard
                  key={article.id}
                  className={styles.article}
                  title={article.title}
                  description={article.description}
                  readTime={article.readTime}
                  createdAt={article.createdAt}
                  imageSrc={`${config.images.origin}/articles/${article.externalId}.jpg`}
                  previewSrc={`${config.images.origin}/articlesPreview/${article.externalId}.jpg`}
                  to={`/${lang}/articles/${article.id}`}
                  icon={faClock}
                />
              ))}
            </div>
            <Pagination total={data?.totalPages} />
          </>
        )}
      </Optional>
    </Page>
  );
};

export { Articles };
