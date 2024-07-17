import { type KodkodResponse } from 'api/types/custom-response';
import http from 'global/api';
import type Unit from 'types/models/Unit';

const ROOT_PATH = '/units';

const constructRoute = (path: string) => `${ROOT_PATH}${path}`;

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
