import * as types from "@types";
import styles from "./Recipe.module.scss";
import { Metadata } from "./(components)/Metadata";
import { Section } from "./(components)/Section";
import { Image } from "@common/components/image/Image";
import { BackButton } from "@common/components/backButton/BackButton";
import { notFound } from "next/navigation";
import { Title } from "@common/components/text/Title";
import { config } from "@config";
import { Page } from "@common/components/page/Page";
import { api } from "@common/utils/api/server";
import { Translations } from "@i18n/loadTranslations";

interface Props {
  id: string;
  translations: Translations;
}

/* @ts-expect-error Async Server Component */
const Recipe: React.FC<Props> = async ({ id, translations }) => {
  const recipe = await api.get<types.Recipe>(`/recipes/${id}`);

  if (!recipe) return notFound();

  return (
    <Page translations={translations}>
      <BackButton className={styles.backButton} text={translations.back} />
      <div className={styles.container}>
        <div>
          <Title text={recipe.title} />
          <div className={styles.content}>
            <div className={styles.column}>
              <Image
                className={styles.image}
                src={`${config.images.origin}/recipes/${recipe.externalId}.jpg`}
                previewSrc={`${config.images.origin}/recipesPreview/${recipe.externalId}.jpg`}
                alt={recipe.title}
              />
              <Metadata
                translations={translations}
                duration={recipe.duration}
                servings={recipe.servings}
              />
              <div className={styles.unorderedLists}>
                <Section
                  title={translations.recipe.ingredients}
                  list={recipe.ingredients}
                />
                <Section
                  title={translations.recipe.nutrition}
                  list={recipe.nutrition}
                />
              </div>
            </div>
            <div className={styles.column}>
              <Image
                className={styles.mobileImage}
                src={`${config.images.origin}/recipes/${recipe.externalId}.jpg`}
                previewSrc={`${config.images.origin}/recipesPreview/${recipe.externalId}.jpg`}
                alt={recipe.title}
              />
              <Metadata
                translations={translations}
                duration={recipe.duration}
                servings={recipe.servings}
                mobile
              />
              <Section
                title={translations.recipe.description}
                description={recipe.description}
              />
              <Section
                title={translations.recipe.preparation}
                list={recipe.preparation}
                listType="ordered"
              />
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export { Recipe };
