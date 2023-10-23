import styles from "./Loader.module.scss";

const Loader: React.FC = () => {
  return (
    <div id="loader" className={styles.container}>
      <div className={styles.loader}></div>
    </div>
  );
};

export { Loader };
