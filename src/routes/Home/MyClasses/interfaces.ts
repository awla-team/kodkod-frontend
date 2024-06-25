import { type Levels } from 'components/Modals/CreateClassModal/interfaces';
import { type ITeacherSubjectClassroom, type IClass } from 'global/interfaces';

export interface MyClassesProps {
  classrooms: ITeacherSubjectClassroom[];
  levels: Levels[];
  getClassroomsData: () => void;
}

export interface ClassLevelData {
  level: number;
  classes: IClass[];
}
