import Link from "next/link";
import styles from "./ArticleCard.module.scss";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Optional } from "../Optional";
import { Image } from "../image/Image";
import classNames from "classnames";
import { toISODate } from "@common/utils/date";

interface Props {
  to: string;
  title: string;
  description: string;
  readTime: string;
  createdAt: string;
  className?: string;
  imageSrc?: string;
  previewSrc?: string;
  icon?: IconDefinition;
}

const ArticleCard: React.FC<Props> = ({
  className,
  to,
  title,
  description,
  readTime,
  createdAt,
  imageSrc,
  previewSrc,
  icon,
}) => {
  return (
    <Link href={to || ""} className={classNames(styles.article, className)}>
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
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
        <div className={styles.footer}>
          <span>{toISODate(createdAt)}</span>
          <span>
            <Optional data={icon}>
              <FontAwesomeIcon className={styles.icon} icon={icon!} />
            </Optional>
            {readTime}
          </span>
        </div>
      </div>
    </Link>
  );
};

export { ArticleCard };
