import http from '../global/api';

export const getSkill = async (skillId: string | number) =>
  await http.get(`skills/${skillId}`);
