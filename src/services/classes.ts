import http from "global/api";
import { ClassInterface } from "./classes/interfaces";

export const getClassesByTeacherId = (teacherId: number | string) =>
  http.get(`users/${teacherId}/classes`);

export const createClass = (body: ClassInterface) => http.post(`classes`, body);
