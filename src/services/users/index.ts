import http from "global/api";

export const getAuthUser = () => {
  return http.get("user/1");
};
