import { Card } from "@common/components/card/Card";
import styles from "./Recipes.module.scss";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { Filters } from "@common/components/filters/Filters";
import { Pagination } from "@common/components/pagination/Pagination";
import * as types from "@types";
import { Optional } from "@common/components/Optional";
import { NoData } from "@common/components/NoData/NoData";
import { toQueryString } from "@common/mappers/toQueryString";
import { config } from "@config";
import { Page } from "@common/components/page/Page";
import { api } from "@common/utils/api/server";
import { Translations } from "@i18n/loadTranslations";

interface RecipesResponse {
  recipes: types.Recipes;
  totalPages: number;
}

interface Props {
  searchParams?: types.QueryParams;
  lang: string;
  translations: Translations;
}

const getFilters = (translations: Translations): Filters => {
  return [
    {
      name: "category",
      label: translations.recipes.filters.category,
      options: [
        {
          text: translations.recipes.filters.breakfast,
          value: types.Category.Breakfast,
        },
        {
          text: translations.recipes.filters.lunch,
          value: types.Category.Lunch,
        },
        {
          text: translations.recipes.filters.dinner,
          value: types.Category.Dinner,
        },
        {
          text: translations.recipes.filters.snack,
          value: types.Category.Snack,
        },
        {
          text: translations.recipes.filters.dessert,
          value: types.Category.Dessert,
        },
      ],
    },
    {
      name: "diet",
      label: translations.recipes.filters.diet,
      options: [
        {
          text: translations.recipes.filters.healthy,
          value: types.Diet.Healthy,
        },
        {
          text: translations.recipes.filters.vegetarian,
          value: types.Diet.Vegetarian,
        },
        {
          text: translations.recipes.filters.vegan,
          value: types.Diet.Vegan,
        },
        {
          text: translations.recipes.filters.lowCarb,
          value: types.Diet.LowCarb,
        },
      ],
    },
  ];
};

/* @ts-expect-error Async Server Component */
const Recipes: React.FC<Props> = async ({
  searchParams,
  lang,
  translations,
}) => {
  const filters = getFilters(translations);
  const data = await api.get<RecipesResponse>(
    `/recipes${toQueryString(searchParams)}`
  );

  return (
    <Page className={styles.container} translations={translations}>
      <Filters filters={filters} align="right" noneText={translations.none} />
      <Optional if={!data?.recipes?.length}>
        <NoData
          imageSrc="/images/notFound.jpg"
          imageAlt={translations.recipes.imageAlt}
          title={translations.noData}
        />
      </Optional>
      <Optional data={data?.recipes}>
        {(recipes: types.Recipes) => (
          <>
            <div className={styles.recipes}>
              {recipes.map((recipe) => (
                <Card
                  key={recipe.id}
                  className={styles.card}
                  imageSrc={`${config.images.origin}/recipes/${recipe.externalId}.jpg`}
                  previewSrc={`${config.images.origin}/recipesPreview/${recipe.externalId}.jpg`}
                  title={recipe.title}
                  icon={faClock}
                  description={recipe.duration}
                  to={`/${lang}/recipes/${recipe.id}`}
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

export { Recipes };
