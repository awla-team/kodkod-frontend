import { ClassInterface } from "../../services/classes/interfaces";
import { StudentType } from "../../components/StudentsList/interfaces";
import { FetchStatus } from "global/enums";
import { IStage } from "global/interfaces";

export interface TabPaths {
  [index: number]: string;
}

export interface ClassContextType {
  getClassById: (id: number | string) => void;
  classDetails: ClassInterface | undefined;
  students: StudentType[];
  loadingClass: FetchStatus;
  getStudentsByClass: (id: number | string) => void;
  updateStudentsData: (
    actionType: "delete" | "update",
    data?: StudentType | StudentType[]
  ) => void;
  updateStageData: (stage: IStage) => void;
}
