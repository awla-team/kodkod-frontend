import type IActivity from './../types/models/Activity';
import { type IActivitySaved } from './../types/models/Activity';
import http from 'global/api';

export const getActivityByLessonId = async (lessonId: number) => {
  return await http.get(`activity?lesson_id=${lessonId}`);
};

export const saveActivity = async (activity: IActivitySaved) => {
  return await http.post('activity', activity);
};

export const editActivity = async (
  activity: IActivitySaved,
  activityId: number
) => {
  return await http.patch(`activity/${activityId}`, activity);
};

export const deleteActivity = async (activityId: number) => {
  return await http.delete(`activity/${activityId}`);
};
