import { type IStage } from 'global/interfaces';

export interface ViewLearningGoalsDialogProps {
  open: boolean;
  currentStage: IStage;
  handleClose: () => void;
  isLoading: boolean;
}
