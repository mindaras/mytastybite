import classNames from "classnames";
import styles from "./ButtonGroup.module.scss";

interface Props {
  children: React.ReactNode;
  reverseMobile?: boolean;
}

const ButtonGroup: React.FC<Props> = ({ reverseMobile, children }) => {
  return (
    <div
      className={classNames(styles.buttonGroup, {
        [styles.buttonGroup__reverseMobile]: reverseMobile,
      })}
    >
      {children}
    </div>
  );
};

export { ButtonGroup };
