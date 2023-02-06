import http from "global/api";
import { StudentType } from "../components/StudentsList/interfaces";

export const studentsByClass = (classId: number | string) => {
  return http.get("students?classId=" + classId);
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
