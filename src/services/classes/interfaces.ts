import { FormInitialState } from "components/Modals/CreateClassModal/interfaces";
import { IAdventure } from "../../global/interfaces";

export interface ClassInterface {
  [index: string]: any;

  id: number;
  userId: number;
  alias: string;
  img?: string;

  code: string;
  level: {
    id: number;
    name: string;
  };

  current_adventure?: IAdventure;
}
export interface ClassInterfaceModified extends Omit<ClassInterface, 'level'>{
  level: number
}