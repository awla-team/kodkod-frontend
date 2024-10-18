import { useEffect, useState, type FC } from 'react';
import {
  Dialog,
  CircularProgress,
  TextField,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
} from '@mui/material';
import { Formik } from 'formik';
import Toaster from 'utils/Toster';
import { type FormInput, type ViewSaveActivityDialogProps } from './interfaces';
import { type IActivitySaved } from 'types/models/Activity';
import { CreateActivitySchema } from 'types/validations/activity';
import { useCreateLesson } from 'zustand/create-lesson-store';
import PostcardIcon from 'assets/images/postcard-heart.svg';

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
      fullWidth
      open={open}
      disableEscapeKeyDown
      onClose={handleClose}
    >
      {currentLesson ? (
        <div>
          <DialogTitle className='tw-flex tw-items-center tw-gap-3'>
            <img src={PostcardIcon} alt='Postcard' className='tw-w-6' />
            Ingresar nueva actividad
          </DialogTitle>
          <DialogContent dividers>
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
                  <div className='tw-flex tw-flex-col tw-gap-4'>
                    <div>
                      <TextField
                        value={values.title}
                        onChange={handleChange}
                        name='title'
                        label='Título'
                        variant='outlined'
                        placeholder='Título de la actividad'
                        fullWidth
                        error={!!errors.title}
                      />
                    </div>
                    <div>
                      <TextField
                        multiline
                        rows={4}
                        fullWidth
                        label='Descripción'
                        value={values.description}
                        onChange={handleChange}
                        name='description'
                        placeholder='Descripción de la actividad'
                        error={!!errors.description}
                      />
                    </div>
                    <DialogActions>
                      <div className='tw-flex tw-items-center tw-gap-2'>
                        <Button
                          variant='outlined'
                          onClick={handleClose}
                        >
                          Cancelar
                        </Button>
                        <Button
                          variant='contained'
                          type='submit'
                          disabled={isSubmitting || !values.title || !values.description}
                        >
                          Guardar actividad
                        </Button>
                      </div>
                    </DialogActions>
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