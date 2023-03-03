import { MissionCardType } from "../../MissionCard";
import { IMission, IStage } from "../../../global/interfaces";

export interface ReplaceMissionModalProps {
  open: boolean;
  onClose: (reason?: "backdropClick" | "escapeKeyDown") => void;
  mission: IMission;

  stage: IStage;
}
