export interface ConfirmationModalProps {
  open: boolean;
  callBackFunction: Function;
  onClose: () => void;
  title?: string;
  confirmText?: string;
  cancelText?: string;
  description?: string | React.ReactNode;
  loading?: boolean;
}
