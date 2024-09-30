import http from 'global/api';
import type { ILessonSaved } from 'types/models/Lesson';
import type ILesson from 'types/models/Lesson';

export const getLessons = async () => {
  return await http.get('lessons');
};

export const getLessonByID = async (id: number | string) => {
  return await http.get('lessons/' + id);
};

export const getLessonsByUnit = async (
  unitId: number | string
): Promise<ILessonSaved[]> => {
  return await http.get('lessons/get-by-unit-id/' + unitId);
};

export const getLessonsByTeacherSubjectClassroomId = async (
  teacherSubjectClassroomId: number | string
): Promise<ILesson[]> => {
  return await http.get(
    'lessons/get-by-teachersubjectclassroom-id/' + teacherSubjectClassroomId
  );
};

export const saveLesson = async (lesson: ILessonSaved) => {
  return await http.post<ILesson>('lessons', lesson);
};

export const editLesson = async (lesson: ILessonSaved, lessonId: number) => {
  return await http.patch(`lessons/${lessonId}`, lesson);
};
