import { type KodkodResponse } from 'api/types/custom-response';
import http from '../global/api';
import { type ISkill } from 'global/interfaces';

export const getSkills = async () =>
  await http.get<KodkodResponse<ISkill[]>>('skill');

export const getSkill = async (skillId: string | number) =>
  await http.get(`skills/${skillId}`);
