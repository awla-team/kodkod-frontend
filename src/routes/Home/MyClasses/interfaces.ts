import { type Levels } from 'components/Modals/CreateClassModal/interfaces';
import {
  type ITeacherSubjectClassroomList,
  type IClass,
} from 'global/interfaces';

export interface MyClassesProps {
  classes: IClass[];
  classrooms: ITeacherSubjectClassroomList[];
  levels: Levels[];
  getClassesData: () => void;
}

export interface ClassLevelData {
  level: number;
  classes: IClass[];
}
