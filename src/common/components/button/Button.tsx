import classNames from "classnames";
import styles from "./Button.module.scss";

export type ButtonVariant = "cta" | "danger" | "text";

interface Props {
  children: React.ReactNode;
  type?: "button" | "submit";
  variant?: ButtonVariant;
  fullWidthMobile?: boolean;
  className?: string;
  disabled?: boolean;
  onClick?: VoidFunction;
}

const Button: React.FC<Props> = ({
  children,
  className,
  type = "button",
  variant = "cta",
  fullWidthMobile,
  disabled,
  onClick,
}) => {
  return (
    <button
      className={classNames(
        styles.button,
        { [styles.button__cta]: variant === "cta" },
        { [styles.button__danger]: variant === "danger" },
        { [styles.button__text]: variant === "text" },
        { [styles.button__fullWidthMobile]: fullWidthMobile },
        { [styles.button__disabled]: disabled },
        className
      )}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export { Button };
