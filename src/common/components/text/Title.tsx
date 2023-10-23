import classNames from "classnames";
import styles from "./Title.module.scss";

interface Props {
  text: string;
  className?: string;
}

const Title: React.FC<Props> = ({ text, className }) => {
  return <h1 className={classNames(styles.title, className)}>{text}</h1>;
};

export { Title };
