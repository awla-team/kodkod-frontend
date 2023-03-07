import http from "../global/api";
import { generateQueryParamsFromObject } from "../utils";

export interface GetRewardsFilter {
  id_adventure?: number | string;
  id_class?: number | string;
}

export const getRewardsByAdventure = (adventureId: number | string) =>
  http.get(`rewards?adventureId=${adventureId}`);

export const getRewards = (filterQuery: GetRewardsFilter) => {
  return http.get("reward" + generateQueryParamsFromObject(filterQuery));
};
