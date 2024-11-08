export default interface ConfirmationFormProps {
  open: boolean;
  onClose: () => void;
  title: string | null;
  description: string | null;
  onSubmit: () => void;
}
