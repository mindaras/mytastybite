import classNames from "classnames";
import styles from "./Metadata.module.scss";
import { faBowlFood, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Translations } from "@i18n/loadTranslations";

interface Props {
  translations: Translations;
  duration: string;
  servings: number;
  mobile?: boolean;
}

const Metadata: React.FC<Props> = ({
  translations,
  duration,
  servings,
  mobile,
}) => {
  const classes = {
    [styles.metadata]: !mobile,
    [styles.mobileMetadata]: mobile,
  };

  return (
    <section className={classNames(classes)}>
      <div>
        <FontAwesomeIcon icon={faClock} />{" "}
        <span className={styles.metaTitle}>{translations.recipe.duration}</span>
        : {duration}
      </div>
      <div>
        <FontAwesomeIcon icon={faBowlFood} />{" "}
        <span className={styles.metaTitle}>{translations.recipe.servings}</span>
        : {servings}
      </div>
    </section>
  );
};

export { Metadata };
