export interface ConfirmationModalProps {
  open: boolean;
  // FIXME: fix this eslint error
  // eslint-disable-next-line @typescript-eslint/ban-types
  callBackFunction: Function;
  onClose: () => void;
  title?: string;
  confirmText?: string;
  cancelText?: string;
  description?: string | React.ReactNode;
  loading?: boolean;
}
