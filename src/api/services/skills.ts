import http from '../api';

export const getSkill = async (skillId: string | number) =>
  await http.get(`skills/${skillId}`);
