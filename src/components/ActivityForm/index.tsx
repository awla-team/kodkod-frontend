import { useEffect, useState, type FC } from 'react';
import {
  Dialog,
  CircularProgress,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { Formik } from 'formik';
import Toaster from 'utils/Toster';
import { type FormInput, type ActivityFormProps } from './interfaces';
import type IActivity from 'types/models/Activity';
import { type IActivitySaved } from 'types/models/Activity';
import { CreateActivitySchema } from 'types/validations/activity';
import { useCreateLesson } from 'zustand/create-lesson-store';

import PostcardIcon from 'assets/images/postcard-heart.svg';
const ActivityForm: FC<ActivityFormProps> = ({
  open,
  handleClose,
  currentLesson,
  activity,
  index,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<FormInput>();
  const { editActivity, modifyEditLessonActivity, addActivity } =
    useCreateLesson();

  const onSubmitEdit = async (values: FormInput) => {
    try {
      if (activity != null) {
        if (typeof activity.id === 'number' && index != null) {
          const editedActivity: IActivity = {
            id: activity.id,
            title: values.title,
            lesson_id: currentLesson.id,
            type: values.type,
            description: values.description,
          };

          modifyEditLessonActivity(editedActivity, index);

          handleClose();
          Toaster('success', `Actividad editada`);
        } else if (index != null) {
          const newActivity: IActivitySaved = {
            title: values.title,
            lesson_id: currentLesson.id,
            type: values.type,
            description: values.description,
          };

          editActivity(newActivity, index);

          handleClose();
          Toaster('success', `Actividad editada`);
        }
      }
    } catch (e) {
      console.log(e);
      Toaster('error', 'Error al editar actividad');
    }
  };

  const onSubmit = (values: FormInput) => {
    try {
      if (activity == null) {
        const activity: IActivitySaved = {
          title: values.title,
          lesson_id: currentLesson.id,
          type: values.type,
          description: values.description,
        };
        addActivity(activity);
        handleClose();
        Toaster('success', `Actividad agregada`);
      }
    } catch (e) {
      console.log(e);
      Toaster('error', 'Error al crear actividad');
    }
  };

  useEffect(() => {
    if (activity != null) {
      setIsLoading(true);
      setFormValues({
        title: activity.title,
        lesson_id: currentLesson.id,
        type: activity.type,
        description: activity.description,
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
  }, [currentLesson, activity]);

  if (isLoading) {
    return (
      <div className='d-flex w-100 align-items-center justify-content-center'>
        <CircularProgress />
      </div>
    );
  }
  return (
    <Dialog fullWidth open={open} disableEscapeKeyDown onClose={handleClose}>
      {currentLesson && formValues && activity != null ? (
        <div>
          <DialogTitle className='tw-flex tw-items-center tw-gap-3'>
            <img src={PostcardIcon} alt='Postcard' className='tw-w-6' />
            Editar actividad
          </DialogTitle>
          <DialogContent dividers>
            <Formik
              initialValues={formValues}
              onSubmit={onSubmitEdit}
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
                        placeholder='Descripcion de la actividad'
                        error={!!errors.description}
                      />
                    </div>
                    <DialogActions>
                      <div className='tw-flex tw-items-center tw-gap-2'>
                        <Button variant='outlined' onClick={handleClose}>
                          Cancelar
                        </Button>
                        <Button
                          variant='contained'
                          type='submit'
                          disabled={
                            isSubmitting || !values.title || !values.description
                          }
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
        <div>
          {currentLesson && formValues ? (
            <div>
              <DialogTitle className='tw-flex tw-items-center tw-gap-3'>
                <img src={PostcardIcon} alt='Postcard' className='tw-w-6' />
                Guardar nueva actividad
              </DialogTitle>
              <DialogContent dividers>
                <Formik
                  initialValues={formValues}
                  onSubmit={onSubmitEdit}
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
                            placeholder='Descripcion de la actividad'
                            error={!!errors.description}
                          />
                        </div>
                        <DialogActions>
                          <div className='tw-flex tw-items-center tw-gap-2'>
                            <Button variant='outlined' onClick={handleClose}>
                              Cancelar
                            </Button>
                            <Button
                              variant='contained'
                              type='submit'
                              disabled={
                                isSubmitting ||
                                !values.title ||
                                !values.description
                              }
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
            <>Sin Datos</>
          )}
        </div>
      )}
    </Dialog>
  );
};

export default ActivityForm;
