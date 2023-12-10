import { type FC } from 'react';
import { type ConfirmationModalProps } from './interface';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

const ConfirmationModal: FC<ConfirmationModalProps> = ({
  open,
  onClose,
  confirmText,
  cancelText,
  callBackFunction,
  description,
  title,
  loading,
}) => {
  return (
    <Dialog open={open} PaperProps={{ className: 'p-3' }} maxWidth='sm'>
      <DialogTitle fontWeight='bold'>{title || 'Confirmación'}</DialogTitle>
      <DialogContent className='py-4'>
        <div>{description}</div>
      </DialogContent>
      <DialogActions className='pt-3'>
        <Button variant="outlined" onClick={() => onClose()}>
          {cancelText || 'No, mantener'}
        </Button>
        <Button
          variant="contained"
          disabled={loading}
          onClick={() => callBackFunction()}
        >
          {confirmText || 'Sí, eliminar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;
