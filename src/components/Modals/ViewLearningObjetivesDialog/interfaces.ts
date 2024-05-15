import { type IStage } from 'global/interfaces';

export interface ViewLearningObjetivesDialogProps {
  open: boolean;
  currentStage: IStage;
  handleClose: () => void;
  isLoading: boolean;
}
