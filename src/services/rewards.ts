import { IReward } from 'global/interfaces';
import http from '../global/api';
import { generateQueryParamsFromObject } from '../utils';

export interface GetRewardsFilter {
  id_adventure?: number | string;
  id_class?: number | string;
}

export const getRewardsByAdventure = (
  adventureId: number | string,
  classId: number | string
) => http.get(`reward?id_adventure=${adventureId}&id_class=${classId}`);

export const getRewards = (filterQuery: GetRewardsFilter) => {
  return http.get('reward' + generateQueryParamsFromObject(filterQuery));
};

export const studentUseRewards = (userId: number, rewards: number[]) => {
  return http.post(`user-use-rewards/${userId}`, rewards);
};

export const studentsRedeemReward = (rewardId: number, studentsId: number[]) =>
  http.post(`/users-redeem-reward/${rewardId}`, studentsId);

export const updateReward = (
  rewardId: number | string,
  body: Partial<IReward>
) => http.put(`reward/${rewardId}`, body);
