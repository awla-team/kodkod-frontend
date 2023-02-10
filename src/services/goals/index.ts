import http from "global/api";

export const getGoals = () => http.get("goals");
