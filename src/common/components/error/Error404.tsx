"use client";

import { Image } from "../image/Image";
import styles from "./Error.module.scss";
import { Button } from "../button/Button";
import { getClientLanguage } from "@common/utils/client/getClientLanguage";

interface Props {
  imageSrc: string;
  imageAlt: string;
  title: string;
  buttonText: string;
  preserveLang?: boolean;
}

const Error404: React.FC<Props> = ({
  imageSrc,
  imageAlt,
  title,
  buttonText,
  preserveLang,
}) => {
  const onClick = () => {
    let path = "/";
    if (preserveLang) path += getClientLanguage();
    window.location.href = path;
  };

  return (
    <div className={styles.error}>
      <div>
        <Image className={styles.image} src={imageSrc} alt={imageAlt} />
        <h1 className={styles.title}>{title}</h1>
        <Button onClick={onClick}>{buttonText}</Button>
      </div>
    </div>
  );
};

export { Error404 };
