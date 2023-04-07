import http from "global/api";
import { IUser } from "global/interfaces";
import { generateQueryParamsFromObject } from "../../utils";

interface UserFilter {
  role?: "student" | "teacher";
}

export const getAuthUser = () => {
  return http.get("/get-auth-user");
};

export const getUsers = (filter: UserFilter) => {
  return http.get("/user" + generateQueryParamsFromObject(filter));
};

export const getUsersByEmail = (params: { role: string, email_list: string[] }) => {
  return http.get<IUser>("/users-by-email", { params: params });
};
