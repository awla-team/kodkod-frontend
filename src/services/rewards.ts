import http from "../global/api";

export const getRewardsByAdventure = (adventureId: number | string) => http.get(`rewards?adventureId=${adventureId}`);