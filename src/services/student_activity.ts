import http from 'global/api';
import type { StudentCompleteActivity } from 'types/models/StudentActivity';
import type { CreateStudentActivity } from 'types/validations/student-activity';

class StudentActivity {
  createWithList = async (data: CreateStudentActivity[]) =>
    await http.post('/student-activity/list', data);

  getStudentsCompletedActivity = async (
    activityId: number,
    query: {
      classroom_id: number;
    }
  ) =>
    await http.get<StudentCompleteActivity[]>(
      `/student-activity/${activityId}/completed`,
      {
        params: query,
      }
    );
}

export default new StudentActivity();
