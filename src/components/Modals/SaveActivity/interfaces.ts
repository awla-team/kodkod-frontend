import type ILesson from 'types/models/Lesson';

export interface FormInput {
  title: string;
  lesson_id: number;
  type: string;
  description: string;
}

export interface ViewSaveActivityDialogProps {
  open: boolean;
  currentLesson: Omit<ILesson, 'teacher_subject_classroom_id'>;
  handleClose: () => void;
}
