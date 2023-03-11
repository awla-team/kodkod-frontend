import http from "../global/api";

export const unlockStage = (body: { id_class_has_adventure: number }) => {
  return http.post("unlock-next-stage", body);
};
