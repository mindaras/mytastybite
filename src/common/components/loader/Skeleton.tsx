import classNames from "classnames";
import styles from "./Skeleton.module.scss";

interface Props {
  className?: string;
  width?: string;
  height?: string;
}

const Skeleton: React.FC<Props> = ({ className, width, height }) => {
  return (
    <div
      className={classNames(styles.skeleton, className)}
      style={{ width, height }}
    />
  );
};

export { Skeleton };
