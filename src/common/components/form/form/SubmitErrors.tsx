import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./SubmitErrors.module.scss";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { Optional } from "@common/components/Optional";
import { useEffect } from "react";

interface Props {
  messages: string[];
  close: VoidFunction;
}

const SubmitErrors: React.FC<Props> = ({ messages, close }) => {
  useEffect(() => {
    const el = document.getElementById("form-errors");
    el?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div id="form-errors" className={styles.errors}>
      <button className={styles.close} type="button" onClick={close}>
        <FontAwesomeIcon icon={faClose} />
      </button>
      <Optional
        if={messages.length > 1}
        then={
          <ul>
            {messages?.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        }
        else={<p>{messages[0]}</p>}
      />
    </div>
  );
};

export { SubmitErrors };
