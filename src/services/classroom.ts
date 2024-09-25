import http from 'global/api';
import type Student from 'types/models/Student';

class ClassroomService {
  getStudentsByClassroom = async (classroomId: number) =>
    await http.get<Student[]>(`/classroom/${classroomId}/students`);
}

export default new ClassroomService();
