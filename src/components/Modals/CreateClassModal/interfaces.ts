import { ClassInterface } from "../../../services/classes/interfaces";

export interface Levels {
  id: number | string;
  name: string;
  _index: number;
}

export interface CreateClassModalProps {
  open: boolean;
  onClose: (
    reason: "backdropClick" | "escapeKeyDown" | "success",
    data?: ClassInterface
  ) => void;
  levels: Levels[];

  classDetails?: ClassInterface;
}

export interface FormInitialState {
  id_level: number | "";
  code: string;
  alias: string;
}
