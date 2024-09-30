export default interface ILesson {
  id: number;
  title: string;
  index: number;
  classroom_id: number;
  teacher_subject_classroom_id?: number;
  started_at?: Date;
  ended_at?: Date;
}

export interface ILessonSaved {
  title: string;
  classroom_id: number;
  index: number;
}
