import { type IStage } from 'global/interfaces';

export interface StageStepperType {
  stages: IStage[];
  activeStage: IStage | null;
  nextNonActiveStage: IStage | null;
}
