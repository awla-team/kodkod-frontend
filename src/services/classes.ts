import http from "global/api";
import { ClassInterface } from "./classes/interfaces";

export const getClassesByTeacherId = (teacherId: number | string) =>
  http.get(`users/${teacherId}/classes`);

export const createClass = (body: Omit<ClassInterface, "id">) =>
  http.post(`classes`, body);


export const getClassByID= (id: number | string) =>{
    return http.get('classes/'+id)
}