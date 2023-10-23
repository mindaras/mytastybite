import {
  ModalContext,
  OpenModalProps,
} from "@common/components/modal/contexts/ModalContext";
import { useContext } from "react";

const useModal = <TData = any>() => {
  const { openedModal, data, setOpenedModal, setData } =
    useContext(ModalContext);

  const openModal = <TData>({ type, data }: OpenModalProps<TData>) => {
    if (data) setData(data);
    setOpenedModal(type);
  };

  const closeModal = () => {
    if (data) setData(null);
    setOpenedModal(null);
  };

  return { openedModal, data: data as TData, openModal, closeModal };
};

export { useModal };
