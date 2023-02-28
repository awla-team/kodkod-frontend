import http from "global/api";
import { generateQueryParamsFromObject } from "../../utils";

interface UserFilter {
  role?: "student" | "teacher";
}

export const getAuthUser = () => {
  return http.get("/user/1");
};

export const getUsers = (filter: UserFilter) => {
  return http.get("/user" + generateQueryParamsFromObject(filter));
};
