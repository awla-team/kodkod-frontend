import http from '../global/api';
import { generateQueryParamsFromObject } from '../utils';
import { type CreateRewardForm } from 'types/validations/reward';
import type IStudent from 'types/models/Student';
import type IReward from 'types/models/Reward';

/**
 * Represents the filter options for retrieving rewards.
 */
export interface GetRewardsFilter {
  id_adventure?: number | string;
  id_class?: number | string;
}

/**
 * Creates a new reward.
 * @param body - The reward data to be created.
 * @returns A promise that resolves to the created reward.
 */
export const createReward = async (
  body: CreateRewardForm & {
    n_required: number;
    lesson_id: number;
  }
) => await http.post('reward', body);

/**
 * Creates multiple rewards.
 * @param body - An array of reward data to be created.
 * @returns A promise that resolves to the created rewards.
 */
export const createRewards = async (
  body: Array<{
    title: string;
    description: string;
    n_required: number;
    lesson_id: number;
  }>
) => await http.post('reward/list', body);

/**
 * Retrieves rewards by adventure and class.
 * @param adventureId - The ID of the adventure.
 * @param classId - The ID of the class.
 * @returns A promise that resolves to the retrieved rewards.
 */
export const getRewardsByAdventure = async (
  adventureId: number | string,
  classId: number | string
) => await http.get(`reward?id_adventure=${adventureId}&id_class=${classId}`);

/**
 * Retrieves rewards based on the provided filter options.
 * @param filterQuery - The filter options for retrieving rewards.
 * @returns A promise that resolves to the retrieved rewards.
 */
export const getRewards = async (filterQuery: GetRewardsFilter) => {
  return await http.get('reward' + generateQueryParamsFromObject(filterQuery));
};

/**
 * Retrieves rewards by lesson ID.
 * @param lessonId - The ID of the lesson.
 * @returns A promise that resolves to the retrieved rewards.
 */
export const getRewardsByLessonId = async (lessonId: number) => {
  return await http.get<IReward[]>(`reward?lesson_id=${lessonId}`);
};

/**
 * Allows a student to use rewards.
 * @param userId - The ID of the user.
 * @param rewards - An array of reward IDs.
 * @returns A promise that resolves when the rewards are used.
 */
export const studentUseRewards = async (userId: number, rewards: number[]) => {
  return await http.post(`user-use-rewards/${userId}`, rewards);
};

/**
 * Allows students to redeem a reward.
 * @param rewardId - The ID of the reward.
 * @param studentsId - An array of student IDs.
 * @returns A promise that resolves when the reward is redeemed.
 */
export const studentsRedeemReward = async (
  rewardId: number,
  studentsId: number[]
) => await http.post(`/users-redeem-reward/${rewardId}`, studentsId);

/**
 * Updates a reward.
 * @param rewardId - The ID of the reward.
 * @param body - The updated reward data.
 * @returns A promise that resolves to the updated reward.
 */
export const updateReward = async (
  rewardId: number | string,
  body: Partial<IReward>
) => await http.put(`reward/${rewardId}`, body);

/**
 * Retrieves students who have completed a reward.
 * @param rewardId - The ID of the reward.
 * @returns A promise that resolves to the students who have completed the reward.
 */
export const getStudentsCompletedReward = async (
  rewardId: number,
  query: {
    t_classroom_id: number;
  }
) => {
  return await http.get<IStudent[]>(`reward/${rewardId}/students`, {
    params: query,
  });
};
