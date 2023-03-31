import {
  ClassInterface,
  ClassInterfaceModified,
} from "services/classes/interfaces";

export interface MyClassesProps {
  classes: ClassInterfaceModified[];
}

export interface ClassLevelData {
  level: number;
  classes: ClassInterfaceModified[];
}
