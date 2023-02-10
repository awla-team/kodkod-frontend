import { ClassInterface } from "../../../services/classes/interfaces";

export interface AddStudentsDialogProps {
  open: boolean;
  onClose: (reason?: "success" | undefined) => void;
  classDetails: ClassInterface;
}

export interface FormInitialState {
  students: {
    email: string;
    name: string;
  }[];
}
