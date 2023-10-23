import classNames from "classnames";
import styles from "./PaginationButton.module.scss";

interface Props {
  active: boolean;
  onClick: () => void;
  children: string | number;
}

const PaginationButton: React.FC<Props> = ({ active, onClick, children }) => (
  <button
    className={classNames(styles.button, { [styles.button__active]: active })}
    onClick={onClick}
  >
    {children}
  </button>
);

export { PaginationButton };
