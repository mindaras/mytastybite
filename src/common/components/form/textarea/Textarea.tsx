import inputStyles from "../input/Input.module.scss";
import styles from "./TextArea.module.scss";
import classNames from "classnames";

interface Props {
  name: string;
  placeholder?: string;
  value?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
  inputRef?: React.MutableRefObject<HTMLInputElement | undefined>;
  onChange: (value: string) => void;
  onBlur?: VoidFunction;
}

const TextArea: React.FC<Props> = ({
  name,
  placeholder,
  value,
  fullWidth,
  disabled,
  className,
  inputRef,
  onChange,
  onBlur,
}) => {
  return (
    <textarea
      className={classNames(
        inputStyles.input,
        styles.textarea,
        {
          [inputStyles.input__fullWidth]: fullWidth,
          [inputStyles.input__disabled]: disabled,
        },
        className
      )}
      name={name}
      placeholder={placeholder}
      value={value}
      disabled={disabled}
      ref={inputRef as any}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
    />
  );
};

export { TextArea };
