import http from "global/api";
import { StudentType } from "../components/StudentsList/interfaces";

export const studentsByClass = (
  classId: number | string,
  role?: "student" | "teacher"
) => {
  return http.get(`user-by-class/${classId}` + (role ? "?role=" + role : ""));
};

export const updateStudent = (
  id: number | string,
  body?: Partial<StudentType>
) => {
  return http.put("students/" + id, body || { classId: null });
};

export const addStudentsInClass = (body: any) => {
  return http.post("students", body);
};
