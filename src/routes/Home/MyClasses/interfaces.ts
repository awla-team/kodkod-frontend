import { IClass } from "global/interfaces";
import {
  ClassInterface,
  ClassInterfaceModified,
} from "services/classes/interfaces";

export interface MyClassesProps {
  classes: IClass[];
  getClassesData: () => void;
}

export interface ClassLevelData {
  level: number;
  classes: ClassInterfaceModified[];
}
