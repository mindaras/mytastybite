import styles from "./Input.module.scss";
import classNames from "classnames";

interface Props {
  name: string;
  type?: string;
  placeholder?: string;
  value?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  accept?: string;
  className?: string;
  inputRef?: React.MutableRefObject<HTMLInputElement | undefined>;
  onChange: (value: string) => void;
  onBlur?: VoidFunction;
}

const Input: React.FC<Props> = ({
  name,
  type = "text",
  placeholder,
  value,
  fullWidth,
  disabled,
  accept,
  className,
  inputRef,
  onChange,
  onBlur,
}) => {
  return (
    <input
      className={classNames(
        styles.input,
        {
          [styles.input__fullWidth]: fullWidth,
          [styles.input__disabled]: disabled,
        },
        className
      )}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      disabled={disabled}
      accept={accept}
      ref={inputRef as any}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
    />
  );
};

export { Input };
