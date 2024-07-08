import http from 'global/api';

export const getTeacherSubjectClassroomByTeacherId = async (
  teacherId: number | string
) => {
  return await http.get(
    `/teacher-subject-classroom/get-by-teacher-id/${teacherId}`
  );
};

export const getTeacherSubjectClassroomById = async (id: number | string) => {
  return await http.get(`/teacher-subject-classroom/${id}`);
};
