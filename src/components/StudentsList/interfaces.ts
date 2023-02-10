import { ClassInterface } from "services/classes/interfaces";

export interface StudentType {
  id: number | string;
  email: string;
  name: string;
  classId: string | number;
}

export interface StudentsListProps {
  studentsData: StudentType[];
  classDetails: ClassInterface;
}

export interface StudentEditInputField {
  email: string;
  name: string;
}
