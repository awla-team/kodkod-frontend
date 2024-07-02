import { type IStudent } from 'global/interfaces';

export default interface IClassroom {
  id: number;
  level_id: number;
  title: string;
  students?: IStudent[];
}
