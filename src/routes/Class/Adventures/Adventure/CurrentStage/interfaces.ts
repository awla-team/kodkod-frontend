import { IStage } from "global/interfaces";

export interface CurrentStageType {
  stages: IStage[];
  activeStage: IStage | null;
  nextNonActiveStage: IStage | null;
}
