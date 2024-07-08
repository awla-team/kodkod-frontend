import http from 'global/api';
import TearcherSubjectClassroom from 'types/models/TeacherSubjectClassroom';

export const getTeacherSubjectClassroomByTeacherId = async (
  teacherId: number | string
) => {
  return await http.get(
    `/teacher-subject-classroom/get-by-teacher-id/${teacherId}`
  );
};

export const getTeacherSubjectClassroomById = async (id: string) => {
  return await http.get<TearcherSubjectClassroom>(
    `/teacher-subject-classroom/${id}`
  );
};
