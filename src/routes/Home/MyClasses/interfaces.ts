import { ClassInterfaceModified } from "services/classes/interfaces";
import { IClass } from "global/interfaces";

export interface MyClassesProps {
  classes: IClass[];
  getClassesData: () => void;
}

export interface ClassLevelData {
  level: number;
  classes: ClassInterfaceModified[];
}
