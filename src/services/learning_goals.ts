import http from 'global/api';

export const getLearningGoals = async () => {
  return await http.get('learning-goal');
};

export const getLearningGoalByID = async (id: number | string) => {
  return await http.get('learning-goal/' + id);
};

export const getLearningGoalsByUnit = async (unitId: number | string) => {
  return await http.get('learning-goal/get-by-unit-id/' + unitId);
};
