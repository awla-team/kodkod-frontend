import type { PropsWithChildren, MouseEvent } from "react";

export interface Levels {
  id: number | string;
  name: string;
}

export interface CreateClassModalProps {
  open: boolean;
  onClose: (reason: "backdropClick" | "escapeKeyDown" | "success") => void;
  levels: Levels[];
}

export interface FormInitialState {
  id_level: number | "";
  code: string;
  alias: string;
}
