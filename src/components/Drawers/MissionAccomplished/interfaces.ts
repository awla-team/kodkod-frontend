import React from "react";

export interface MissionAccomplishedProps {
  open: boolean;
  anchor: "left" | "right" | "top" | "bottom";
  onClose?: (event: Event | React.MouseEvent) => void;
}
