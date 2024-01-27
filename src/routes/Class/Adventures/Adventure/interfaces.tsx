import {
  IAdventure,
  type IClassHasAdventure,
  type IMission,
  type IStage,
} from 'global/interfaces';
import { type StudentType } from 'components/StudentsList/interfaces';
import { type StageMissionUpdateBody } from 'services/missions';

export interface IAdventureBannerProps {
  backgroundImg: string;
}

export interface IClassHasAdventureProviderProps
  extends React.PropsWithChildren {
  adventureId: string | undefined;
}

export interface IClassHasAdventureContext {
  classHasAdventure: IClassHasAdventure | undefined;
  missions: IMission[];

  students: StudentType[];
  handleUpdateCurrentAdventure: (
    data: IMission,
    ref: StageMissionUpdateBody
  ) => void;
  updateStageData: (stage: IStage) => void;
}
