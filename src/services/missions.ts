import http from "../global/api";

export const getMissionsByStage = () => http.get(`mission`);
