import { createContext } from "react";

export type ModalType = "Confirmation" | null;

export interface OpenModalProps<T = any> {
  type: ModalType;
  data: T;
}

interface Value {
  openedModal: ModalType;
  data: any;
  setOpenedModal: (type: ModalType) => void;
  setData: (data: any) => void;
}

const ModalContext = createContext<Value>({
  openedModal: null,
  data: null,
  setOpenedModal: () => null,
  setData: () => null,
});

export { ModalContext };
