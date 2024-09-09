import http from 'global/api';
import type { CreateStudentActivity } from 'types/validations/student-activity';

class StudentActivity {
  createWithList = async (data: CreateStudentActivity[]) =>
    await http.post('/student-activity/list', data);
}

export default new StudentActivity();
