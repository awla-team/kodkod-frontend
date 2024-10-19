import { useEffect, useState, type FC } from 'react';
import {
  Dialog,
  CircularProgress,
  TextField,
  TextareaAutosize,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import { Formik } from 'formik';
import Toaster from 'utils/Toster';
import { type FormInput, type ViewEditActivityDialogProps } from './interfaces';
import type IActivity from 'types/models/Activity';
import { type IActivitySaved } from 'types/models/Activity';
import { CreateActivitySchema } from 'types/validations/activity';
import { useCreateLesson } from 'zustand/create-lesson-store';

const ViewEditActivityDialog: FC<ViewEditActivityDialogProps> = ({
  open,
  handleClose,
  currentLesson,
  editedActivity,
  newActivity,
  index,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<FormInput>();
  const { editActivity, modifyEditLessonActivity } = useCreateLesson();

  const onSubmit = async (values: FormInput) => {
    try {
      if (newActivity) {
        const activity: IActivitySaved = {
          title: values.title,
          lesson_id: currentLesson.id,
          type: values.type,
          description: values.description,
        };

        editActivity(activity, index);

        handleClose();
        Toaster('success', `Actividad editada`);
      }
      if (editedActivity) {
        const activity: IActivity = {
          id: editedActivity.id,
          title: values.title,
          lesson_id: currentLesson.id,
          type: values.type,
          description: values.description,
        };

        modifyEditLessonActivity(activity, index);

        handleClose();
        Toaster('success', `Actividad editada`);
      }
    } catch (e) {
      console.log(e);
      Toaster('error', 'Error al editar actividad');
    }
  };

  useEffect(() => {
    if (newActivity) {
      setIsLoading(true);
      setFormValues({
        title: newActivity?.title,
        lesson_id: currentLesson.id,
        type: newActivity.type,
        description: newActivity?.description,
      });
    } else if (editedActivity) {
      setIsLoading(true);
      setFormValues({
        title: editedActivity?.title,
        lesson_id: currentLesson.id,
        type: editedActivity.type,
        description: editedActivity?.description,
      });
    } else {
      setFormValues({
        title: '',
        lesson_id: currentLesson.id,
        type: 'Sin Tipo',
        description: '',
      });
    }
    setIsLoading(false);
  }, [currentLesson, newActivity, editedActivity]);

  if (isLoading) {
    return (
      <div className='d-flex w-100 align-items-center justify-content-center'>
        <CircularProgress />
      </div>
    );
  }
  return (
    <Dialog
      PaperProps={{ className: 'p-3' }}
      open={open}
      disableEscapeKeyDown
      onClose={handleClose}
    >
      {currentLesson && formValues ? (
        <div>
          <DialogTitle fontWeight='bold' className='mb-2'>
            Editar Actividad
          </DialogTitle>
          <DialogContent dividers className='mb-3'>
            <Formik
              initialValues={formValues}
              onSubmit={onSubmit}
              validationSchema={CreateActivitySchema}
            >
              {({
                values,
                handleChange,
                handleSubmit,
                isSubmitting,
                errors,
              }) => (
                <form onSubmit={handleSubmit}>
                  <div className='tw-space-y-6'>
                    <h5 className='tw-flex tw-gap-4'>
                      {currentLesson.title || 'Clase sin nombre'}
                    </h5>

                    <div>
                      <TextField
                        className=''
                        value={values.title}
                        onChange={handleChange}
                        name='title'
                        placeholder='Inserte el título de la actividad'
                        fullWidth
                        error={!!errors.title}
                      />
                      {errors.title && (
                        <p className='tw-text-red-500 tw-text-sm'>
                          {errors.title}
                        </p>
                      )}
                    </div>
                    <div className=''>
                      <TextareaAutosize
                        className={`tw-w-full p-2 border rounded bg-white text-black ${
                          errors.description
                            ? 'tw-border-red-500 tw-outline-none tw-ring-red-500'
                            : ''
                        } rounded-md`}
                        value={values.description}
                        onChange={handleChange}
                        name='description'
                        placeholder='Inserte la descripcion de la actividad'
                      />
                      {errors.description && (
                        <p className='tw-text-red-500 tw-text-sm'>
                          {errors.description}
                        </p>
                      )}
                    </div>
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
                        className='tw-bg-primary-500 tw-w-full'
                        disabled={isSubmitting}
                      >
                        Guardar
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </Formik>
          </DialogContent>
        </div>
      ) : (
        <div>Sin Datos</div>
      )}
    </Dialog>
  );
};

export default ViewEditActivityDialog;
