import { ClassInterface } from "services/classes/interfaces";

export interface StudentType {
  id: number | string;
  role: string;
  first_name: string;
  last_name: string;

  email: string;
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
