import { IAdventure } from "../../../global/interfaces";

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
