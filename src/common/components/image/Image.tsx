"use client";

import { memo, useEffect, useRef, useState } from "react";
import styles from "./Image.module.scss";
import classNames from "classnames";
import { useLazyLoad } from "@common/hooks/useLazyLoad";

interface Props {
  src: string;
  alt: string;
  previewSrc?: string;
  preview?: string;
  lazy?: boolean;
  className?: string;
}

const getUrl = (src?: string) => {
  if (!src) return null;
  return src;
};

const Img: React.FC<Props> = ({ src, alt, previewSrc, lazy, className }) => {
  const isLazy = lazy || !!previewSrc;
  const initialSrc = previewSrc ? previewSrc : lazy ? undefined : src;
  const [currentSrc, setCurrentSrc] = useState(getUrl(initialSrc));
  const [loading, setLoading] = useState(isLazy ? true : false);
  const ref = useRef<HTMLImageElement>();
  const imageUrl = getUrl(src) as string;

  const onLoad = () => {
    setCurrentSrc(imageUrl);
    setLoading(false);
  };

  const { observe, disconnect } = useLazyLoad({ ref, src: imageUrl, onLoad });

  useEffect(() => {
    if (!isLazy) return;
    observe();
    return disconnect;
  }, [src, previewSrc, isLazy]);

  return (
    <div
      className={classNames(className, styles.container, {
        [styles.container__loading]: loading,
      })}
    >
      <img
        className={classNames(styles.image, {
          [styles.image__hidden]: !currentSrc,
        })}
        src={currentSrc as string}
        alt={alt}
        ref={ref as any}
      />
    </div>
  );
};

const Image = memo(Img);

export { Image };
