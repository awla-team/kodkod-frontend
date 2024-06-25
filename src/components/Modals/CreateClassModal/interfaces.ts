import { type ITeacherSubjectClassroom } from 'global/interfaces';

export interface Levels {
  id: number | string;
  name: string;
  _index: number;
}

export interface CreateClassModalProps {
  open: boolean;
  onClose: (
    reason: 'backdropClick' | 'escapeKeyDown' | 'success',
    data?: ITeacherSubjectClassroom
  ) => void;
  levels: Levels[];

  classroomDetails?: ITeacherSubjectClassroom;
}

export interface FormInitialState {
  id_level: number | '';
  code: string;
  alias: string;
}
