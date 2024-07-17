import { type KodkodResponse } from 'api/types/custom-response';
import http from 'global/api';
import type Unit from 'types/models/Unit';

const ROOT_PATH = '/units';

const constructRoute = (path: string) => `${ROOT_PATH}${path}`;

export const searchUnits = async ({
  subject_id,
  classroom_id,
}: {
  subject_id: number;
  classroom_id: number;
}) => {
  return await http.get<Unit[]>(`/unit/search`, {
    params: { subject_id, classroom_id },
  });
};
