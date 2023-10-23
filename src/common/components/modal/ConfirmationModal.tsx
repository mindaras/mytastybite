"use client";

import { useEffect } from "react";
import { Button, ButtonVariant } from "../button/Button";
import styles from "./ConfirmationModal.module.scss";
import { useModal } from "@common/hooks/useModal";
import { Optional } from "../Optional";

export interface ConfirmationModalData {
  title?: string;
  description?: string;
  confirmLabel?: string;
  confirmVariant?: ButtonVariant;
  cancelLabel?: string;
  cancelVariant?: ButtonVariant;
  onConfirm: VoidFunction;
  onCancel?: VoidFunction;
}

const ConfirmationModal: React.FC = () => {
  const { closeModal, data } = useModal<ConfirmationModalData>();
  const {
    title,
    description,
    confirmLabel,
    confirmVariant,
    cancelLabel,
    cancelVariant = "text",
    onConfirm,
    onCancel,
  } = data;

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") closeModal();
  };

  useEffect(() => {
    document.body.classList.add(styles.disableScroll);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove(styles.disableScroll);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const cancelHandler = () => {
    closeModal();
    onCancel?.();
  };

  const confirmHandler = () => {
    closeModal();
    onConfirm();
  };

  return (
    <div className={styles.container} onClick={closeModal}>
      <div className={styles.overlay} />
      <div className={styles.modal}>
        <Optional data={title}>
          <h3 className={styles.title}>{title}</h3>
        </Optional>
        <p className={styles.description}>{description}</p>
        <div className={styles.buttons}>
          <Optional if={!!cancelLabel}>
            <Button variant={cancelVariant} onClick={cancelHandler}>
              {cancelLabel}
            </Button>
          </Optional>
          <Optional if={!!confirmLabel && !!onConfirm}>
            <Button variant={confirmVariant} onClick={confirmHandler}>
              {confirmLabel}
            </Button>
          </Optional>
        </div>
      </div>
    </div>
  );
};

export { ConfirmationModal };
