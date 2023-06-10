import { IClass, ModifiedIClass } from 'global/interfaces';

export interface MyClassesProps {
  classes: ModifiedIClass[];
  getClassesData: () => void;
}

export interface ClassLevelData {
  level: number;
  classes: IClass[];
}
