import { IMission } from "global/interfaces";

export interface IMissionCardContainerProps {
  background?: string;
}

export interface MissionCardType {
  id: number | string;
  title: string;
  description: string;
  points: number;
  difficulty: string;
}

export interface IMissionCardProps {
  mission: IMission;
  openModal?: (mission: IMission) => void;
  selected?: boolean;
  clickable?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}
