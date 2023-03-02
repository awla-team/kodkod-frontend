import React from "react";
import { MissionCardType } from "../../MissionCard";
import { IMission } from "../../../global/interfaces";

export interface MissionAccomplishedProps {
  open: boolean;
  anchor: "left" | "right" | "top" | "bottom";
  onClose?: (event: Event | React.MouseEvent) => void;

  mission: IMission;
}
