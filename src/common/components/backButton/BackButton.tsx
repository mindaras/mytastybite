"use client";

import classNames from "classnames";
import styles from "./BackButton.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

interface Props {
  to?: string;
  text?: string;
  className?: string;
  onClick?: VoidFunction;
}

const BackButton: React.FC<Props> = ({ to, text = "Back", className }) => {
  const router = useRouter();

  const onClick = () => {
    if (to) router.push(to);
    else router.back();
  };

  return (
    <button
      className={classNames(styles.backButton, className)}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faChevronLeft} className={styles.icon} />
      {text}
    </button>
  );
};

export { BackButton };
