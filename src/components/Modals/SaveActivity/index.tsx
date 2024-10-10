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
import { Link } from 'react-router-dom';
import Toaster from 'utils/Toster';
import { type FormInput, type ViewSaveActivityDialogProps } from './interfaces';
import { saveActivity } from 'services/activities';
import { type IActivitySaved } from 'types/models/Activity';
import { CreateActivitySchema } from 'types/validations/activity';
import { useCreateLesson } from 'zustand/create-lesson-store';

const ViewSaveActivityDialog: FC<ViewSaveActivityDialogProps> = ({
  open,
  handleClose,
  currentLesson,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formValues] = useState<FormInput>({
    title: '',
    lesson_id: currentLesson.id,
    type: 'Sin Tipo',
    description: '',
  });
  const { addActivity } = useCreateLesson();

  const onSubmit = async (values: FormInput) => {
    try {
      const activity: IActivitySaved = {
        title: values.title,
        lesson_id: currentLesson.id,
        type: values.type,
        description: values.description,
      };
      addActivity(activity);
      handleClose();
      Toaster('success', `Actividad agregada`);
    } catch (e) {
      console.log(e);
      Toaster('error', 'Error al crear actividad');
    }
  };

  useEffect(() => {
    if (!currentLesson) {
      setIsLoading(true);
    }
    setIsLoading(false);
  }, [currentLesson]);

  if (isLoading)
    return (
      <div className='d-flex w-100 align-items-center justify-content-center'>
        <CircularProgress />
      </div>
    );

  return (
    <Dialog
      PaperProps={{ className: 'p-3' }}
      open={open}
      disableEscapeKeyDown
      onClose={handleClose}
    >
      {currentLesson ? (
        <div>
          <DialogTitle fontWeight='bold' className='mb-2'>
            Guardar Nueva Actividad
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

export default ViewSaveActivityDialog;
