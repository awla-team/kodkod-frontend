import {ClassInterface} from "../../services/classes/interfaces";
import {StudentType} from "../../components/StudentsList/interfaces";

export interface TabPaths {
  [index: number]: string;
}

export interface ClassContextType{
  getClassById:(id: number| string) => void;
  classDetails: ClassInterface | undefined;
  students:  StudentType[];
  getStudentsByClass: (id: number| string) => void
}