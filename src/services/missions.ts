import http from '../api/api';
import { generateQueryParamsFromObject } from '../utils';

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
  studentIds: Array<number | string>;
  id_stage: number;
  id_mission: number;
}

export const getMissionsByStage = async (query?: MissionFilterType) =>
  await http.get(
    `mission` + (query ? generateQueryParamsFromObject(query) : '')
  );

export const getMissionsByClassAdventure = async (
  classAdventureId: number | string
) => await http.get(`missions-by-class-adventure/${classAdventureId}`);

export const getStageMissions = async (stageId: number | string) =>
  await http.get(`stage-missions/${stageId}`);

export const updateStageMission = async (body: StageMissionUpdateBody) =>
  await http.put('update-stage-mission', body);

export const missionAccomplished = async (body: MissionAccomplishedType) => {
  return await http.post('mission-accomplished', body);
};

export const completedMissionByStudents = async (
  queryParams: Omit<MissionAccomplishedType, 'studentIds'>
) => {
  return await http.get(
    'mission-student-details' +
      (queryParams ? generateQueryParamsFromObject(queryParams) : '')
  );
};
