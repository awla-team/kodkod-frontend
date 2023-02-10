import http from "global/api";
import { ClassInterface } from "./classes/interfaces";

export const getClassesByUser = (userId: number | string) =>
  http.get(`classes-by-user/`+userId);

export const createClass = (body: Omit<ClassInterface, "id">) =>
  http.post(`classes`, body);


export const getClassByID= (id: number | string) =>{
    return http.get('classes/'+id)
}


