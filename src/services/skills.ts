import http from "../global/api";

export const getSkill = (skillId: string | number) =>
  http.get(`skills/${skillId}`);
