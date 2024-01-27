import http from '../config';

export const getSkill = async (skillId: string | number) =>
  await http.get(`skills/${skillId}`);
