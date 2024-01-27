import { type IClass } from 'global/interfaces';
import { type StudentType } from '../../StudentsList/interfaces';

export interface AddStudentsDialogProps {
  open: boolean;
  onClose: (reason?: 'student' | undefined, data?: StudentType[]) => void;
  classDetails: IClass;
}

export interface FormInitialState {
  students: Array<{
    email: string;
    first_name: string;
    last_name: string;
  }>;
}
