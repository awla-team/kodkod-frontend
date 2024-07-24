export default interface IActivity {
  id: number;
  title: string;
  lesson_id: number;
  type: string;
  description: string;
}

export interface IActivitySaved {
  title: string;
  lesson_id: number;
  type: string;
  description: string;
}
