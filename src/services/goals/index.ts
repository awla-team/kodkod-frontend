import http from "global/api";

export const getGoals = () => http.get("goal");

export const getGoalById = (id: number | string) =>
  http.get(`goal/${id}?adventures=true`);
