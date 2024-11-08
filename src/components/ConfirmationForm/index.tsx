import { type FC } from 'react';
import {
  DialogTitle,
  DialogContent,
  Divider,
  DialogActions,
  Button,
  Dialog,
} from '@mui/material';

import type ConfirmationFormProps from './interfaces';
import { useModalStore } from 'contexts/ZustandContext/modal-context';

const ConfirmationForm: FC<ConfirmationFormProps> = ({
  description,
  onSubmit,
  onClose,
  open,
  title,
}) => {
  const { closeModal } = useModalStore();

  return (
    <Dialog fullWidth open={open} disableEscapeKeyDown onClose={onClose}>
      {title && <DialogTitle className=''>{title}</DialogTitle>}
      <DialogContent dividers={!!title}>
        <div className='tw-space-y-6'>
          {description && (
            <h5 className='tw-flex tw-justify-center tw-mb-8'>{description}</h5>
          )}
          <DialogActions>
            <div className='tw-flex tw-justify-center tw-items-center tw-gap-2'>
              <Button variant='outlined' onClick={onClose} type='button'>
                Cancelar
              </Button>
              <Button
                variant='contained'
                type='submit'
                onClick={() => {
                  onSubmit();
                  onClose();
                }}
                className='tw-bg-red-500'
              >
                Confirmar
              </Button>
            </div>
          </DialogActions>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationForm;
