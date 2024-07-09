import type Subject from './Subject';
import type Unit from './Unit';

export default interface TearcherSubjectClassroom {
  id: number;
  teacher_id: number;
  classroom_id: number;
  subject_id: number;
  subject?: Subject & {
    units?: Unit[];
  };
}
