import {
  type IAdventure,
  type IClassHasAdventure,
  type IMission,
  type IStage,
} from 'global/interfaces';
import { Dispatch, type PropsWithChildren, SetStateAction } from 'react';
import { type StudentType } from 'components/StudentsList/interfaces';
import { type StageMissionUpdateBody } from 'services/missions';

export interface GoalType {
  id: number | string;
  title: string;
  description?: string;
  image_url?: string;

  adventures?: IAdventure[];
}

export interface GoalResponseType {
  responseData: GoalType[];
  responseStatus: number;
}

export interface ClassHasAdventureWithProviderProps {
  classHasAdventure?: IClassHasAdventure;
  missions?: IMission[];
  students?: StudentType[];

  updateStageData?: (stage: IStage) => void;
  handleUpdateCurrentAdventure?: (
    data: IMission,
    ref: StageMissionUpdateBody
  ) => void;
}

export interface ClassHasAdventureProviderProps
  extends ClassHasAdventureWithProviderProps,
    PropsWithChildren {}
