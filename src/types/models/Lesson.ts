export default interface ILesson {
  id: number;
  title: string;
  index: number;
  teacher_subject_classroom_id: number;
  started_at?: Date;
  ended_at?: Date;
  goal?: string;
}

export interface ILessonSaved {
  title: string;
  index: number;
  teacher_subject_classroom_id: number;
  goal?: string;
}
