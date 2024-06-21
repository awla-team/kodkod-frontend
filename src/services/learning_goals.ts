import http from 'global/api';
import { type ILearningGoal } from 'types/models/LearningGoal';

export const getLearningGoals = async () => {
  return await http.get('learning-goal');
};

export const getLearningGoalByID = async (id: number | string) => {
  return await http.get('learning-goal/' + id);
};

export const getLearningGoalsByUnit = async (
  unitId: number | string
): Promise<ILearningGoal[]> => {
  return await http.get('learning-goal/get-by-unit-id/' + unitId);
};
