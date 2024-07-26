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

const ViewSaveActivityDialog: FC<ViewSaveActivityDialogProps> = ({
  open,
  handleClose,
  currentLesson,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formValues] = useState<FormInput>({
    title: '',
    lesson_id: currentLesson.id,
    type: 'test',
    description: '',
  });

  const onSubmit = async (values: FormInput) => {
    try {
      const activity: IActivitySaved = {
        title: values.title,
        lesson_id: currentLesson.id,
        type: values.type,
        description: values.description,
      };
      const { status } = await saveActivity(activity);

      if (status === 200) {
        Toaster('success', 'Actividad creada');
        handleClose();
      }
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
            {'Guardar Nueva Actividad'}
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
                    <Link className='fw-bold tw-flex' onClick={handleClose}>
                      {'< Volver a la clase'}
                    </Link>

                    <h5 className='tw-flex tw-gap-4'>
                      {currentLesson.title || 'Clase Test'}
                    </h5>

                    <div>
                      <TextField
                        className=''
                        value={values.title}
                        onChange={handleChange}
                        name='title'
                        placeholder='Inserte el título de la actividad'
                        fullWidth
                      />
                      {errors.title && (
                        <p className='tw-text-red-500 tw-text-sm'>
                          {errors.title}
                        </p>
                      )}
                    </div>
                    <div className=''>
                      <TextField
                        className='tw-w-full tw-bg-white'
                        value={values.description}
                        onChange={handleChange}
                        name='description'
                        placeholder='Inserte la descripcion de la actividad'
                      />
                    </div>
                    <div className='tw-flex tw-items-center tw-justify-end tw-mx-6'>
                      <button
                        onClick={handleClose}
                        type='button'
                        className='tw-mx-6 tw-bg-gray-200 text-black'
                      >
                        Cancelar
                      </button>
                      <button
                        type='submit'
                        className='tw-bg-gray-500'
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
        <div>Test</div>
      )}
    </Dialog>
  );
};

export default ViewSaveActivityDialog;
