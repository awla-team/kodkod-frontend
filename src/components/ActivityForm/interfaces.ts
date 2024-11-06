import type IActivity from 'types/models/Activity';
import { type IActivitySaved } from 'types/models/Activity';
import type ILesson from 'types/models/Lesson';

export interface FormInput {
  title: string;
  lesson_id: number;
  type: string;
  description: string;
}

export interface ActivityFormProps {
  open: boolean;
  currentLesson: Omit<ILesson, 'teacher_subject_classroom_id'>;
  handleClose: () => void;
  activity: IActivity | null;
  index?: number;
}
