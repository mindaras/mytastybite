import styles from "./Section.module.scss";
import { List, ListType } from "./List";
import { Optional } from "@common/components/Optional";

interface Props {
  title: string;
  description?: string;
  list?: string[];
  listType?: ListType;
}

const Section: React.FC<Props> = ({ title, description, list, listType }) => {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <Optional if={!!description}>{description}</Optional>
      <Optional data={list}>
        {(list: string[]) => <List items={list} type={listType} />}
      </Optional>
    </section>
  );
};

export { Section };
