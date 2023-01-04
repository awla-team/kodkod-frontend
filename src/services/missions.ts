import http from "../global/api";

export const getMissionsByStage = (stageId: number | string) => http.get(`missions?stageId=${stageId}&_expand=skill`);