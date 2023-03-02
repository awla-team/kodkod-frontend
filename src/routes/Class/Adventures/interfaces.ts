import { IAdventure, IMission } from "../../../global/interfaces";
import { PropsWithChildren } from "react";

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
}

export interface AdventureProviderProps
  extends AdventureWithProviderProps,
    PropsWithChildren {}
