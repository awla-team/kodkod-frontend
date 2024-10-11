import { type FC } from 'react';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import Toaster from 'utils/Toster';

import { useCreateLesson } from 'zustand/create-lesson-store';
import { type ViewDeleteActivityDialogProps } from './interfaces';

const ViewDeleteActivityDialog: FC<ViewDeleteActivityDialogProps> = ({
  open,
  handleClose,
  activityDeleteListAdd,
  editedActivity,
  newActivity,
  index,
}) => {
  const { deleteActivity, deleteEditLessonActivity } = useCreateLesson();

  const onSubmit = async () => {
    try {
      if (newActivity) {
        deleteActivity(index);

        handleClose();
        Toaster('success', `Actividad eliminada`);
      }
      if (editedActivity && activityDeleteListAdd) {
        deleteEditLessonActivity(index);
        activityDeleteListAdd();
        handleClose();
        Toaster('success', `Actividad eliminada`);
      }
    } catch (e) {
      console.log(e);
      Toaster('error', 'Error al eliminar actividad');
    }
  };

  return (
    <Dialog
      PaperProps={{ className: 'p-3' }}
      open={open}
      disableEscapeKeyDown
      onClose={handleClose}
    >
      <div>
        <DialogTitle fontWeight='bold' className='mb-2'>
          Eliminar Actividad
        </DialogTitle>
        <DialogContent dividers className='mb-3'>
          <div className='tw-space-y-6'>
            <h5 className='tw-flex tw-justify-center tw-mb-8'>
              <b>Quiere eliminar esta recompensa?</b>
            </h5>
            <div className='tw-flex tw-items-center tw-gap-1'>
              <button
                onClick={handleClose}
                type='button'
                className=' tw-bg-gray-200 text-black tw-w-full'
              >
                Cancelar
              </button>
              <button
                type='submit'
                onClick={onSubmit}
                className='tw-bg-danger tw-w-full'
              >
                Confirmar
              </button>
            </div>
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default ViewDeleteActivityDialog;
