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

export interface MissionAccomplishedType {
  studentIds: (number | string)[];
  id_stage: number;
  id_mission: number;
}

export const getMissionsByStage = (query?: MissionFilterType) =>
  http.get(`mission` + (query ? generateQueryParamsFromObject(query) : ""));

export const getMissionsByClassAdventure = (
  classAdventureId: number | string
) => http.get(`missions-by-class-adventure/${classAdventureId}`);

export const getStageMissions = (stageId: number | string) =>
  http.get(`stage-missions/${stageId}`);

export const updateStageMission = (body: StageMissionUpdateBody) =>
  http.put("update-stage-mission", body);

export const missionAccomplished = (body: MissionAccomplishedType) => {
  return http.post("mission-accomplished", body);
};

export const completedMissionByStudents = (
  queryParams: Omit<MissionAccomplishedType, "studentIds">
) => {
  return http.get(
    "mission-student-details" +
      (queryParams ? generateQueryParamsFromObject(queryParams) : "")
  );
};
