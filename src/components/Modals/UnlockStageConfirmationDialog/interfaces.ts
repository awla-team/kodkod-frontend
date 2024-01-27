import { type IStage } from 'global/interfaces';

export interface UnlockStageConfirmationDialogProps {
  open: boolean;
  currentStage: IStage;
  handleClose: () => void;
  isLoading: boolean;
  onConfirm: () => void;
  unlockableStageData: IStage;
  finishImg: string;
}
