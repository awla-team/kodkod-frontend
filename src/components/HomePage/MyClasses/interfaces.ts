import { ClassInterface } from "services/classes/interfaces";

export interface MyClassesProps {
  classes: ClassInterface[];
}

export interface ClassLevelData {
  level: number;
  classes: ClassInterface[];
}
