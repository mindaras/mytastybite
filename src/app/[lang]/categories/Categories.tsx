import { Card } from "@common/components/card/Card";
import styles from "./Categories.module.scss";
import { Category } from "@types";
import { Page } from "@common/components/page/Page";
import { Translations } from "@i18n/loadTranslations";

interface Props {
  lang: string;
  translations: Translations;
}

const Categories: React.FC<Props> = ({ lang, translations }) => {
  return (
    <Page className={styles.cards} translations={translations}>
      <Card
        key="breakfast"
        imageSrc="/images/categories/breakfast.jpg"
        previewSrc="/images/categories/breakfast-preview.jpg"
        title={translations.categories.breakfast}
        to={`/${lang}?category=${Category.Breakfast}`}
      />
      <Card
        key="lunch"
        imageSrc="/images/categories/lunch.jpg"
        previewSrc="/images/categories/lunch-preview.jpg"
        title={translations.categories.lunch}
        to={`/${lang}?category=${Category.Lunch}`}
      />
      <Card
        key="dinner"
        imageSrc="/images/categories/dinner.jpg"
        previewSrc="/images/categories/dinner-preview.jpg"
        title={translations.categories.dinner}
        to={`/${lang}?category=${Category.Dinner}`}
      />
      <Card
        key="sback"
        imageSrc="/images/categories/snack.jpg"
        previewSrc="/images/categories/snack-preview.jpg"
        title={translations.categories.snack}
        to={`/${lang}?category=${Category.Snack}`}
      />
      <Card
        key="dessert"
        imageSrc="/images/categories/dessert.jpg"
        previewSrc="/images/categories/dessert-preview.jpg"
        title={translations.categories.dessert}
        to={`/${lang}?category=${Category.Dessert}`}
      />
    </Page>
  );
};

export { Categories };
