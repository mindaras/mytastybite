import { Pagination } from "@common/components/pagination/Pagination";
import * as types from "@types";
import { Optional } from "@common/components/Optional";
import { NoData } from "@common/components/NoData/NoData";
import { toQueryString } from "@common/mappers/toQueryString";
import { api } from "@common/utils/api/server";
import { Translations } from "@i18n/loadTranslations";
import { CMSPage } from "@common/components/page/CMSPage";
import styles from "./Articles.module.scss";
import { config } from "@config";
import { Image } from "@common/components/image/Image";
import { Search } from "@common/components/search/Search";
import Link from "next/link";
import { toISODate } from "@common/utils/date";
import { Button } from "@common/components/button/Button";
import { ButtonLink } from "@common/components/button/ButtonLink";

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
    <CMSPage>
      <div className={styles.header}>
        <Search fullWidthMobile className={styles.search} />
      </div>
      <Optional if={!data?.articles?.length}>
        <NoData
          imageSrc="/images/notFound.jpg"
          imageAlt={translations.recipes.imageAlt}
          title={translations.noData}
        />
      </Optional>
      <div className={styles.actions}>
        <ButtonLink
          to={`/${lang}/cms/articles/create`}
          text="Create"
          fullWidthMobile
        />
      </div>
      <Optional data={data?.articles}>
        {(articles: types.Articles) => (
          <>
            <div className={styles.articles}>
              {articles.map((article) => (
                <Link
                  key={article.id}
                  className={styles.article}
                  href={`/${lang}/cms/articles/${article.id}`}
                >
                  <span className={styles.id}>{article.id}</span>
                  <span className={styles.title}>{article.title}</span>
                  <span className={styles.created}>
                    {toISODate(article.createdAt)}
                  </span>
                  <Image
                    className={styles.image}
                    src={`${config.images.origin}/articles/${article.externalId}.jpg`}
                    alt={article.title}
                  />
                </Link>
              ))}
            </div>
            <Pagination total={data?.totalPages} />
          </>
        )}
      </Optional>
    </CMSPage>
  );
};

export { Articles };
