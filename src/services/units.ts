import http from 'global/api';
import type Unit from 'types/models/Unit';

export const searchUnits = async ({
  subjectId,
  classroomId,
}: {
  subjectId: number;
  classroomId: number;
}) => {
  return await http.get<Unit[]>(`/unit/search`, {
    params: { subject_id: subjectId, classroom_id: classroomId },
  });
};
