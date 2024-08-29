import type ILesson from 'types/models/Lesson';

export interface FormInput {
  title: string;
  lesson_id: number;
  type: string;
  description: string;
}

export interface ViewEditActivityDialogProps {
  open: boolean;
  currentLesson: ILesson;
  currentType: string;
  handleClose: () => void;
}
