import { IStage } from "global/interfaces";

export interface UnlockStageConfirmationDialogProps {
  open: boolean;
  handleClose: () => void;
  isLoading: boolean;
  onConfirm: () => void;
  unlockableStageData: IStage;
}
