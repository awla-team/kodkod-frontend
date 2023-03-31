export interface ConfirmationModalProps {
  open: boolean;
  callBackFunction: Function;
  onClose: () => void;
  title?: string;
  description?: string | React.ReactNode;
  loading?: boolean;
}
