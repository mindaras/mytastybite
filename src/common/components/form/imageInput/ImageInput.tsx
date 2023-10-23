"use client";

import { Input } from "../input/Input";
import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import styles from "./ImageInput.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Optional } from "@common/components/Optional";
import { Image } from "@common/components/image/Image";

interface Props {
  name: string;
  type?: string;
  value?: string;
  placeholder?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  imageAlt?: string;
  removeAriaLabel?: string;
  className?: string;
  onChange: (file: File | string) => void;
  onBlur?: VoidFunction;
}

const ImageInput: React.FC<Props> = ({
  name,
  value,
  placeholder,
  fullWidth,
  disabled,
  imageAlt = "Image preview",
  removeAriaLabel = "Remove image",
  className,
  onChange,
}) => {
  const [imageSrc, setImageSrc] = useState<string>();
  const inputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    if (value) setImageSrc(value);
  }, []);

  const onInputChange = () => {
    const file = inputRef.current?.files?.[0] as File;
    onChange(file);
    setImageSrc(URL.createObjectURL(file));
  };

  const onRemove = () => {
    inputRef.current!.value = "";
    setImageSrc("");
    onChange("");
  };

  return (
    <div
      className={classNames(
        styles.imageInput,
        {
          [styles.imageInput__fullWidth]: fullWidth,
          [styles.imageInput__preview]: !!imageSrc,
        },
        className
      )}
      tabIndex={1}
    >
      <Input
        name={name}
        type="file"
        accept=".png,.jpg,.jpeg"
        placeholder={placeholder}
        disabled={disabled}
        inputRef={inputRef}
        onChange={onInputChange}
        className={styles.input}
      />
      <FontAwesomeIcon
        icon={faImage}
        className={styles.icon}
        onClick={() => inputRef.current?.click()}
      />
      <Optional data={imageSrc}>
        <Image className={styles.image} src={imageSrc!} alt={imageAlt} />
        <button
          type="button"
          aria-label={removeAriaLabel}
          className={styles.overlay}
          onClick={onRemove}
        >
          <FontAwesomeIcon icon={faTrash} className={styles.icon} />
        </button>
      </Optional>
    </div>
  );
};

export { ImageInput };
