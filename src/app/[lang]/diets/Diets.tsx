import { Card } from "@common/components/card/Card";
import styles from "./Diets.module.scss";
import { Diet } from "@types";
import { Page } from "@common/components/page/Page";
import { Translations } from "@i18n/loadTranslations";

interface Props {
  lang: string;
  translations: Translations;
}

const Diets: React.FC<Props> = ({ lang, translations }) => {
  return (
    <Page className={styles.cards} translations={translations}>
      <Card
        key="healthy"
        imageSrc="/images/diets/healthy.jpg"
        previewSrc="/images/diets/healthy-preview.jpg"
        title={translations.diets.healthy}
        to={`/${lang}?diet=${Diet.Healthy}`}
      />
      <Card
        key="vegetarian"
        imageSrc="/images/diets/vegetarian.jpg"
        previewSrc="/images/diets/vegetarian-preview.jpg"
        title={translations.diets.vegetarian}
        to={`/${lang}?diet=${Diet.Vegetarian}`}
      />
      <Card
        key="vegan"
        imageSrc="/images/diets/vegan.jpg"
        previewSrc="/images/diets/vegan-preview.jpg"
        title={translations.diets.vegan}
        to={`/${lang}?diet=${Diet.Vegan}`}
      />
      <Card
        key="lowCarb"
        imageSrc="/images/diets/lowCarb.jpg"
        previewSrc="/images/diets/lowCarb-preview.jpg"
        title={translations.diets.lowCarb}
        to={`/${lang}?diet=${Diet.LowCarb}`}
      />
    </Page>
  );
};

export { Diets };
