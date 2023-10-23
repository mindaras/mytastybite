import styles from "./Card.module.scss";
import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { Optional } from "../Optional";
import { Image } from "../image/Image";
import Link from "next/link";

interface Props {
  title: string;
  className?: string;
  imageSrc?: string;
  previewSrc?: string;
  description?: string;
  to?: string;
  icon?: IconDefinition;
}

const Card: React.FC<Props> = ({
  title,
  className,
  imageSrc,
  previewSrc,
  description,
  to,
  icon,
}) => {
  return (
    <Link
      href={to || ""}
      className={classnames({ [styles.disabledClick]: !to })}
    >
      <div className={classnames(styles.card, className)}>
        <Optional data={imageSrc}>
          <Image
            className={styles.image}
            src={imageSrc!}
            previewSrc={previewSrc}
            alt={title}
            lazy
          />
        </Optional>
        <div className={styles.content}>
          <h3 className={styles.title}>{title}</h3>
          <Optional if={!!description}>
            <div className={styles.description}>
              <Optional data={icon}>
                <FontAwesomeIcon className={styles.icon} icon={icon!} />
              </Optional>
              {description}
            </div>
          </Optional>
        </div>
      </div>
    </Link>
  );
};

export { Card };
