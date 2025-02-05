import { JSX } from "react";

export interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
  header: JSX.Element;
  content: JSX.Element;
  footer: JSX.Element;
  className: string;
}