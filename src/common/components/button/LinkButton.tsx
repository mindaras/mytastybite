import classNames from "classnames";
import styles from "./Button.module.scss";
import Link from "next/link";

interface Props {
  to: string;
  children: React.ReactNode;
  className?: string;
}

const LinkButton: React.FC<Props> = ({ to, children, className }) => {
  return (
    <Link href={to} className={classNames(styles.button, className)}>
      {children}
    </Link>
  );
};

export { LinkButton };
