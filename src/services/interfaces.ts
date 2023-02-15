import { StudentUpdateDataType } from "components/StudentsList/interfaces";

export interface AddStudentsInClassBody {
  id_class: string | number;
  students: StudentUpdateDataType[];
}
