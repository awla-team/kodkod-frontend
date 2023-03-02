import http from "../global/api";

interface StageMissionUpdateBody {
  id_stage: number;
  new_mission_id: number;
  old_mission_id: number;
}

export const getMissionsByStage = () => http.get(`mission`);

export const updateStageMission = (body: StageMissionUpdateBody) =>
  http.put("update-stage-mission", body);
