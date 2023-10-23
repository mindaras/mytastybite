"use client";

import { useModal } from "@common/hooks/useModal";
import { ConfirmationModal } from "./ConfirmationModal";

const Modal: React.FC = () => {
  const { openedModal } = useModal();

  switch (openedModal) {
    case "Confirmation":
      return <ConfirmationModal />;
    default:
      return null;
  }
};

export { Modal };
