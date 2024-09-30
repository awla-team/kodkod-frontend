import type IActivity from 'types/models/Activity';
import { type IActivitySaved } from 'types/models/Activity';
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
  handleClose: () => void;
  newActivity?: IActivitySaved;
  editedActivity?: IActivity;
  index: number;
}
