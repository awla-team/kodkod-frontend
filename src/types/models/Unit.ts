import type Lesson from './Lesson';

export default interface Unit {
  id: number;
  subject_id: number;
  title: string;
  lessons?: Lesson[];
}
