import http from "../global/api";
import { generateQueryParamsFromObject } from "../utils";

export interface StageMissionUpdateBody {
  id_stage: number;
  new_mission_id: number;
  old_mission_id: number;
}

interface MissionFilterType {
  id?: number;
  id_skill?: number;
  description?: string;
  difficulty?: string;
  title?: string;
}

export const getMissionsByStage = (query?: MissionFilterType) =>
  http.get(`mission` + (query ? generateQueryParamsFromObject(query) : ""));

export const updateStageMission = (body: StageMissionUpdateBody) =>
  http.put("update-stage-mission", body);
