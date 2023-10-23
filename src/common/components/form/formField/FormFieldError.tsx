import styles from "./FormFieldError.module.scss";

interface Props {
  error?: string;
}

const FormFieldError: React.FC<Props> = ({ error }) => {
  return <div className={styles.error}>{error}</div>;
};

export { FormFieldError };
