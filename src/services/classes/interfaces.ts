import { FormInitialState } from "components/Modals/CreateClassModal/interfaces";

export interface ClassInterface {
  [index: string]: any;

  id?: number;
  userId: number;
  alias: string;
  img?: string;
  level: number;
}
