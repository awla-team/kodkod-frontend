import type { PropsWithChildren, MouseEvent } from "react";

export interface CreateClassModalProps {
  open: boolean;
  onClose: (
    e: MouseEvent<HTMLButtonElement>,
    reason: "backdropClick" | "escapeKeyDown"
  ) => void;
}

export interface FormInitialState {
  level: number | "";
  code: string;
  alias: string;
}
