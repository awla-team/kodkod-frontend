import http from "global/api";

export const getClassesByTeacherId = (teacherId: number | string) =>
  http.get(`users/${teacherId}/classes`);
