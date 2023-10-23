import classNames from "classnames";
import styles from "./List.module.scss";
import { Optional } from "@common/components/Optional";

export type ListType = "ordered" | "unordered";

interface Props {
  items: string[];
  type?: ListType;
  className?: string;
}

const List: React.FC<Props> = ({ items, type = "unordered" }) => {
  const listTypeClass = {
    [styles.unordered]: type === "unordered",
    [styles.ordered]: type === "ordered",
  };

  return (
    <Optional if={!!items}>
      {() => (
        <ul className={classNames(styles.list, listTypeClass)}>
          {items?.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </Optional>
  );
};

export { List };
