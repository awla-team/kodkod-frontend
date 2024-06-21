import http from 'global/api';
import { type ITeacherSubjectClassroomList } from 'global/interfaces';

export const getTeacherSubjectClassroomByTeacherId = async (
  teacherId: number | string
): Promise<ITeacherSubjectClassroomList[]> => {
  return await http.get(
    `/teacher-subject-classroom/get-by-teacher-id/${teacherId}`
  );
};
