import http from "global/api";
import { CreateClassBody } from "./classes/interfaces";

export const getClassesByTeacherId = (teacherId: number | string) =>
  http.get(`users/${teacherId}/classes`);

export const createClass = (body: CreateClassBody) =>
  http.post(`classes`, body);
