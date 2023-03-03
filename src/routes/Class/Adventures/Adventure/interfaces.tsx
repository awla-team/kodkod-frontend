import { IAdventure, IMission } from "global/interfaces";
import { StudentType } from "components/StudentsList/interfaces";
import {StageMissionUpdateBody} from "services/missions";

export interface IAdventureBannerProps {
  backgroundImg: string;
}

export interface IAdventureProviderProps extends React.PropsWithChildren {
  adventureId: string | undefined;
}

export interface IAdventureContext {
  adventure: IAdventure | undefined;
  missions: IMission[];

  students: StudentType[];
  handleUpdateCurrentAdventure: (data: IMission, ref:StageMissionUpdateBody) => void;
}
