import {
  IAdventure,
  IClassHasAdventure,
  IMission,
  IStage,
} from 'global/interfaces';
import { StudentType } from 'components/StudentsList/interfaces';
import { StageMissionUpdateBody } from 'services/missions';

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
