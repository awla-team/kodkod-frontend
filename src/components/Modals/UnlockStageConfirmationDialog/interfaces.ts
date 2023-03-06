export interface UnlockStageConfirmationDialogProps {
  open: boolean;
  handleClose: () => void;
  isLoading: boolean;
  onConfirm: () => void;
}
