import { type KodkodResponse } from 'api/types/custom-response';
import http from 'global/api';
import type Unit from 'types/models/Unit';

const ROOT_PATH = '/unit';

const constructRoute = (path: string) => `${ROOT_PATH}${path}`;

export const getUnitsBySubject = async (query: { subject_id: string }) => {
  return await http.get<KodkodResponse<Unit[]>>(constructRoute(`/search`));
};
