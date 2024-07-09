import type Lesson from './Lesson';

export default interface Unit {
  id: number;
  title: string;
  lessons?: Lesson[];
}
