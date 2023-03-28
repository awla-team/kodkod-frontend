import { IAdventure, IMission, IStage } from "global/interfaces";
import { Dispatch, PropsWithChildren, SetStateAction } from "react";
import { StudentType } from "components/StudentsList/interfaces";
import { StageMissionUpdateBody } from "services/missions";

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

export interface AdventureWithProviderProps {
  adventure?: IAdventure;
  missions?: IMission[];
  students?: StudentType[];

  updateStagesData?: (stage: IStage) => void;
  handleUpdateCurrentAdventure?: (
    data: IMission,
    ref: StageMissionUpdateBody
  ) => void;
  makeAdventureNull?: () => void
}

export interface AdventureProviderProps
  extends AdventureWithProviderProps,
    PropsWithChildren {}
