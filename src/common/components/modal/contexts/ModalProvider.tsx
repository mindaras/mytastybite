"use client";

import { useState } from "react";
import { ModalContext, ModalType } from "./ModalContext";

interface Props {
  children: React.ReactNode;
}

const ModalProvider: React.FC<Props> = ({ children }) => {
  const [openedModal, setOpenedModal] = useState<ModalType>(null);
  const [data, setData] = useState();

  return (
    <ModalContext.Provider
      value={{
        openedModal,
        data,
        setOpenedModal,
        setData,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export { ModalProvider };
