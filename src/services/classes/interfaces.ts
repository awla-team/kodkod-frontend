import { FormInitialState } from "components/Modals/CreateClassModal/interfaces";
import { IAdventure } from "../../global/interfaces";

export interface ClassInterface {
  [index: string]: any;

  id: number;
  userId: number;
  alias: string;
  img?: string;
  level: number;

  current_adventure?: IAdventure;
}
