import { MissionCardType } from "../../MissionCard";

export interface ReplaceMissionModalProps {
  open: boolean;
  onClose: (reason?: "backdropClick" | "escapeKeyDown") => void;

  mission: MissionCardType;
}
