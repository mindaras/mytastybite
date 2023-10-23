import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./PaginationArrow.module.scss";
import classNames from "classnames";

interface Props {
  direction: "left" | "right";
  disabled?: boolean;
  onClick: VoidFunction;
}

const PaginationArrow: React.FC<Props> = ({ direction, disabled, onClick }) => {
  return (
    <FontAwesomeIcon
      className={classNames({ [styles.disabled]: disabled })}
      icon={direction === "left" ? faChevronLeft : faChevronRight}
      onClick={onClick}
    />
  );
};

export { PaginationArrow };
