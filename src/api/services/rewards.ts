import { type IReward } from 'global/interfaces';
import http from '../config';
import { generateQueryParamsFromObject } from '../../utils';

export interface GetRewardsFilter {
  id_adventure?: number | string;
  id_class?: number | string;
}

export const getRewardsByAdventure = async (
  adventureId: number | string,
  classId: number | string
) => await http.get(`reward?id_adventure=${adventureId}&id_class=${classId}`);

export const getRewards = async (filterQuery: GetRewardsFilter) => {
  return await http.get('reward' + generateQueryParamsFromObject(filterQuery));
};

export const studentUseRewards = async (userId: number, rewards: number[]) => {
  return await http.post(`user-use-rewards/${userId}`, rewards);
};

export const studentsRedeemReward = async (
  rewardId: number,
  studentsId: number[]
) => await http.post(`/users-redeem-reward/${rewardId}`, studentsId);

export const updateReward = async (
  rewardId: number | string,
  body: Partial<IReward>
) => await http.put(`reward/${rewardId}`, body);
