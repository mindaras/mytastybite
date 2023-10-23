import { Optional } from "@common/components/Optional";
import { Input } from "../input/Input";
import styles from "./TextInput.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import classNames from "classnames";

interface Props {
  name: string;
  type?: string;
  value?: string;
  placeholder?: string;
  fullWidth?: boolean;
  fullWidthMobile?: boolean;
  disabled?: boolean;
  className?: string;
  onChange: (value: string, reset?: boolean) => void;
  onBlur?: VoidFunction;
}

const TextInput: React.FC<Props> = ({
  name,
  type = "text",
  value,
  placeholder,
  fullWidth,
  fullWidthMobile,
  disabled,
  className,
  onChange,
  onBlur,
}) => {
  const inputRef = useRef<HTMLInputElement>();

  const clear = () => {
    onChange("", true);
    inputRef.current?.focus();
  };

  return (
    <div
      className={classNames(
        styles.textInput,
        {
          [styles.textInput__fullWidth]: fullWidth,
          [styles.textInput__fullWidthMobile]: fullWidthMobile,
        },
        className
      )}
    >
      <Input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        inputRef={inputRef}
        onChange={onChange}
        onBlur={onBlur}
      />
      <Optional if={!!value && !disabled}>
        <button
          className={styles.button}
          type="button"
          tabIndex={-1}
          onClick={clear}
        >
          <FontAwesomeIcon icon={faClose} />
        </button>
      </Optional>
    </div>
  );
};

export { TextInput };
