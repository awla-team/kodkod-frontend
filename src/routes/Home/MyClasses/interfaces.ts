import { type Levels } from 'components/Modals/CreateClassModal/interfaces';
import { type IClass } from 'global/interfaces';

export interface MyClassesProps {
  classes: IClass[];
  levels: Levels[];
  getClassesData: () => void;
}

export interface ClassLevelData {
  level: number;
  classes: IClass[];
}
