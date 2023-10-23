import styles from "./CMSPage.module.scss";
import classNames from "classnames";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const CMSPage: React.FC<Props> = ({ className, children }) => {
  return <div className={classNames(styles.page, className)}>{children}</div>;
};

export { CMSPage };
