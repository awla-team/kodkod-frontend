import React from "react";
import { MissionCardType } from "../../MissionCard";

export interface MissionAccomplishedProps {
  open: boolean;
  anchor: "left" | "right" | "top" | "bottom";
  onClose?: (event: Event | React.MouseEvent) => void;

  mission: MissionCardType;
}
