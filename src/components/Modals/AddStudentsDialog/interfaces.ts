import { IClass } from 'global/interfaces';
import { StudentType } from '../../StudentsList/interfaces';

export interface AddStudentsDialogProps {
  open: boolean;
  onClose: (reason?: 'student' | undefined, data?: StudentType[]) => void;
  classDetails: IClass;
}

export interface FormInitialState {
  students: {
    email: string;
    first_name: string;
    last_name: string;
  }[];
}
