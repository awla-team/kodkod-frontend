import type { PropsWithChildren, MouseEvent } from "react";

export interface CreateClassModalProps {
  open: boolean;
  onClose: (reason: "backdropClick" | "escapeKeyDown" |'success') => void;
}

export interface FormInitialState {
  level: number | "";
  code: string;
  alias: string;
}
