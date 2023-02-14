import http from "global/api";
import {
  StudentType,
  StudentUpdateDataType,
} from "../components/StudentsList/interfaces";

export const studentsByClass = (
  classId: number | string,
  role?: "student" | "teacher"
) => {
  return http.get(`user-by-class/${classId}` + (role ? "?role=" + role : ""));
};

export const updateStudent = (
  id: number | string,
  body?: Partial<StudentUpdateDataType>
) => {
  return http.put("user/" + id, body);
};

export const addStudentsInClass = (body: any) => {
  return http.post("students", body);
};

export const deleteStudent = (id: number | string) => {
  return http.delete("user/" + id);
};
