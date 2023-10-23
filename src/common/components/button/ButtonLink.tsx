import classNames from "classnames";
import Link from "next/link";
import buttonStyles from "./Button.module.scss";
import styles from "./ButtonLink.module.scss";

interface Props {
  to: string;
  text: string;
  fullWidthMobile?: boolean;
  disabled?: boolean;
  className?: string;
}

const ButtonLink: React.FC<Props> = ({
  to,
  text,
  fullWidthMobile,
  disabled,
  className,
}) => {
  return (
    <Link
      href={to}
      className={classNames(
        buttonStyles.button,
        styles.buttonLink,
        { [buttonStyles.button__fullWidthMobile]: fullWidthMobile },
        { [buttonStyles.button__cta]: true },
        { [buttonStyles.button__disabled]: disabled },
        className
      )}
    >
      {text}
    </Link>
  );
};

export { ButtonLink };
