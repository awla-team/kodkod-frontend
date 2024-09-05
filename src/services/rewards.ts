import { type IReward } from 'global/interfaces';
import http from '../global/api';
import { generateQueryParamsFromObject } from '../utils';
import { type CreateRewardForm } from 'types/validations/reward';

export interface GetRewardsFilter {
  id_adventure?: number | string;
  id_class?: number | string;
}

export const createReward = async (
  body: CreateRewardForm & {
    n_required: number;
    lesson_id: number;
  }
) => await http.post('reward', body);

export const createRewards = async (
  body: Array<{
    title: string;
    description: string;
    n_required: number;
    lesson_id: number;
  }>
) => await http.post('reward/list', body);

export const getRewardsByAdventure = async (
  adventureId: number | string,
  classId: number | string
) => await http.get(`reward?id_adventure=${adventureId}&id_class=${classId}`);

export const getRewards = async (filterQuery: GetRewardsFilter) => {
  return await http.get('reward' + generateQueryParamsFromObject(filterQuery));
};

export const getRewardsByLessonId = async (lessonId: number) => {
  return await http.get(`reward?lesson_id=${lessonId}`);
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
