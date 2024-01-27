import http from '../config';

export const unlockStage = async (body: { id_class_has_adventure: number }) => {
  return await http.post('unlock-next-stage', body);
};
