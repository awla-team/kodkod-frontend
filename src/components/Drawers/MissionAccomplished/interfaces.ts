import React from "react";
import { MissionCardType } from "../../MissionCard";
import { IMission, IStage } from "../../../global/interfaces";

export interface MissionAccomplishedProps {
  open: boolean;
  anchor: "left" | "right" | "top" | "bottom";
  onClose?: (event: Event | React.MouseEvent) => void;
  stage: IStage;
  mission: IMission;
}

export interface StudentsDetailsType {
  id_user: number;
  id_stage: number;
  id_mission: number;
  prev_points: number;
  credit_points: number;
  new_points: number;
  created_at: string;
}
