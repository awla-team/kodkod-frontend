import http from "global/api";
import { ClassInterface } from "./classes/interfaces";

interface ClassMutationType {
  id?: number;
  id_level: number;
  code: string;
  alias: string;
  id_user?: number;
}
export const getClassesByUser = (userId: number | string) =>
  http.get(`classes-by-user/` + userId);

export const createClass = (body: ClassMutationType) =>
  http.post(`class`, body);

export const getClassByID = (id: number | string) => {
  return http.get("class/" + id);
};

export const updateClass = (body: ClassMutationType) => {
  return http.put("class/" + body.id, body);
};

export const deleteClass = (id: number | string) => {
  return http.delete("class/" + id);
};

export const getClassHasAdventuresByClass = (classId: number | string) => {
  return http.get(`completed-class-adventures/${classId}`);
};
