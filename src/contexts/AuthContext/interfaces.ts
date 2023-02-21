import { User } from "../../services/users/interfaces";

interface TeacherType extends User {
  role: "teacher";
}

export interface AuthContextType {
  user: TeacherType | null;
}
