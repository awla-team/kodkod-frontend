import http from 'api/config';

export const getGoals = async () => await http.get('goal');

export const getGoalById = async (id: number | string) =>
  await http.get(`goal/${id}?adventures=true`);
