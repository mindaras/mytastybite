import { Image } from "../image/Image";
import styles from "./NoData.module.scss";

interface Props {
  imageSrc: string;
  imageAlt: string;
  title: string;
}

const NoData: React.FC<Props> = ({ imageSrc, imageAlt, title }) => {
  return (
    <div className={styles.container}>
      <div>
        <Image className={styles.image} src={imageSrc} alt={imageAlt} />
        <span className={styles.title}>{title}</span>
      </div>
    </div>
  );
};

export { NoData };
