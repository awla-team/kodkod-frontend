import http from "../global/api";

export const getSchools = () => {
  return http.get("school");
};
