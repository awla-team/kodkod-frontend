import http from "global/api";
import {
  StudentType,
  StudentUpdateDataType,
} from "../components/StudentsList/interfaces";
import { AddStudentsInClassBody } from "./interfaces";
import { generateQueryParamsFromObject } from "../utils";

export interface UserFilter {
  role?: "student" | "teacher";
  missions?: boolean;
}

export const studentsByClass = (
  classId: number | string,
  queryObject?: UserFilter
) => {
  return http.get(
    `user-by-class/${classId}` + generateQueryParamsFromObject(queryObject)
  );
};

export const updateStudent = (
  id: number | string,
  body?: Partial<StudentUpdateDataType>
) => {
  return http.put("user/" + id, body);
};

export const addStudentsInClass = (body: AddStudentsInClassBody) => {
  return http.post("add-students", body);
};

export const deleteStudent = (id: number | string) => {
  return http.delete("user/" + id);
};
