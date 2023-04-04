import { ClassInterface } from "services/classes/interfaces";
import { IMission } from "../../global/interfaces";

export interface StudentType {
  id: number | string;
  role: string;
  first_name: string;
  last_name: string;

  email: string;
  classId: string | number;

  points: number;
  missions: IMission[];
}

export interface StudentUpdateDataType {
  role: "student";
  first_name: string;
  last_name: string;
  email: string;
}

export interface StudentsListProps {
  studentsData: StudentType[];
  classDetails: ClassInterface;
}

export interface StudentEditInputField {
  email: string;
  first_name: string;
  last_name: string;
}
