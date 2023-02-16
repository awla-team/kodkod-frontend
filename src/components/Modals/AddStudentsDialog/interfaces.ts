import { ClassInterface } from "services/classes/interfaces";
import { StudentType } from "../../StudentsList/interfaces";

export interface AddStudentsDialogProps {
  open: boolean;
  onClose: (reason?: "student" | undefined, data?: StudentType[]) => void;
  classDetails: ClassInterface;
}

export interface FormInitialState {
  students: {
    email: string;
    name: string;
  }[];
}
