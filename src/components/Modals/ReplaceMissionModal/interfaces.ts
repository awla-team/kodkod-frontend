import { MissionCardType } from "../../MissionCard";
import {IStage} from "../../../global/interfaces";

export interface ReplaceMissionModalProps {
  open: boolean;
  onClose: (reason?: "backdropClick" | "escapeKeyDown") => void;
  mission: MissionCardType;

  stage: IStage
}
