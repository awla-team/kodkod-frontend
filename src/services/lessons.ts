import http from 'global/api';
import type { ILessonSaved } from 'types/models/Lesson';
import type ILesson from 'types/models/Lesson';
import type IReward from 'types/models/Reward';

export const getLessons = async () => {
  return await http.get('lessons');
};

export const getLessonByID = async (id: number | string) => {
  return await http.get<ILesson>('lessons/' + id);
};

export const getLessonsByUnit = async (
  unitId: number | string
): Promise<ILessonSaved[]> => {
  return await http.get('lessons/get-by-unit-id/' + unitId);
};

export const saveLesson = async (lesson: ILessonSaved) => {
  return await http.post<ILesson>('lessons', lesson);
};

export const editLesson = async (lesson: ILessonSaved, lessonId: number) => {
  return await http.patch(`lessons/${lessonId}`, lesson);
};

export const finishLesson = async (
  lessonId: number,
  data: {
    ended_at: string;
  }
) => await http.patch<IReward>(`lessons/${lessonId}`, data);
