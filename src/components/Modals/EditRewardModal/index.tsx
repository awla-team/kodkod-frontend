import { useState } from 'react';
import { Formik } from 'formik';
import { TextField, TextareaAutosize } from '@mui/material';
import { useModalStore } from 'contexts/ZustandContext/modal-context';
import {
  type CreateRewardForm,
  CreateRewardSchema,
  EditRewardSchema,
} from 'types/validations/reward';
import { cn } from 'utils/methods';
import { useCreateLesson } from 'zustand/create-lesson-store';
import type IReward from 'types/models/Reward';
import Toaster from 'utils/Toster';

interface EditRewardModalProps {
  newReward?: CreateRewardForm;
  editedReward?: IReward;
  index: number;
}

export default function EditRewardModal({
  newReward,
  editedReward,
  index,
}: EditRewardModalProps) {
  const [newRewardformValues] = useState<CreateRewardForm>({
    name: newReward?.name || editedReward?.title || '',
    description: newReward?.description || editedReward?.description || '',
  });
  const [numberOfActivities, setNumberOfActivities] = useState<number>(
    editedReward?.n_required || 1
  );
  const { closeModal } = useModalStore();
  const { editReward, modifyEditLessonReward } = useCreateLesson();

  const increment = () => {
    setNumberOfActivities((prev) => prev + 1);
  };

  const decrement = () => {
    if (numberOfActivities > 1) {
      setNumberOfActivities((prev) => prev - 1);
    }
  };

  const onSubmit = (values: CreateRewardForm) => {
    const data = {
      ...values,
      numberOfActivities,
    };

    editReward(data, index);
    closeModal();
    Toaster('success', `Recompensa editada`);
  };

  const onSubmitEdit = (values: IReward) => {
    values.n_required = numberOfActivities;

    modifyEditLessonReward(values, index);
    closeModal();
  };

  if (editedReward) {
    return (
      <Formik
        initialValues={editedReward}
        validationSchema={EditRewardSchema}
        onSubmit={onSubmitEdit}
      >
        {({ values, handleChange, handleSubmit, isSubmitting, errors }) => (
          <form onSubmit={handleSubmit} className='tw-space-y-4 '>
            <div>
              <label className='tw-text-sm tw-font-semibold'>
                Nombre de la recompensa
              </label>
              <TextField
                className=''
                value={values.title}
                onChange={handleChange}
                name='name'
                placeholder='Inserte el nombre de la recompensa'
                fullWidth
                error={!!errors.title}
              />
              {errors.title && (
                <p className='tw-text-red-500 tw-text-sm'>{errors.title}</p>
              )}
            </div>
            <div>
              <label className='tw-text-sm tw-font-semibold'>
                Ingrese la descripción de la recompensa
              </label>
              <TextareaAutosize
                className={`tw-w-full p-2 border rounded bg-white text-black tw-resize-none ${
                  errors.description
                    ? 'tw-border-red-500 tw-outline-none tw-ring-red-500'
                    : ''
                } rounded-md`}
                value={values.description}
                onChange={handleChange}
                name='description'
                placeholder='Ingrese la descripción de la recompensa'
              />
              {errors.description && (
                <p className='tw-text-red-500 tw-text-sm'>
                  {errors.description}
                </p>
              )}
            </div>
            <div>
              <label className='tw-text-sm tw-font-semibold'>
                Numero de actividad a completar para obtenerla
              </label>
              <p className='tw-text-xs tw-font-light tw-text-gray-500'>
                Ingrese el número de actividades que el estudiante debe
                completar para esta recompensa
              </p>
              <div className='tw-flex tw-items-center tw-justify-center tw-gap-2'>
                <button
                  type='button'
                  onClick={decrement}
                  className='tw-bg-white tw-text-black'
                >
                  -
                </button>
                <div className='tw-p-4 border tw-w-10 tw-h-10 tw-flex tw-items-center tw-justify-center'>
                  {numberOfActivities}
                </div>

                <button
                  type='button'
                  onClick={increment}
                  className='tw-bg-white tw-text-black'
                >
                  +
                </button>
              </div>
            </div>
            <div className='tw-flex tw-items-center tw-gap-2'>
              <button
                onClick={closeModal}
                type='button'
                className=' tw-bg-white tw-text-black border tw-w-full'
              >
                Cancelar
              </button>
              <button
                type='submit'
                className={cn(
                  'tw-w-full',
                  !!errors.title || !!errors.description
                    ? 'tw-bg-gray-200 tw-text-black'
                    : 'tw-bg-primary-500 tw-text-white'
                )}
                disabled={
                  isSubmitting || !!errors.title || !!errors.description
                }
              >
                Guardar recompensa
              </button>
            </div>
          </form>
        )}
      </Formik>
    );
  }

  if (newReward) {
    return (
      <Formik
        initialValues={newRewardformValues}
        validationSchema={CreateRewardSchema}
        onSubmit={onSubmit}
      >
        {({ values, handleChange, handleSubmit, isSubmitting, errors }) => (
          <form onSubmit={handleSubmit} className='tw-space-y-4 '>
            <div>
              <label className='tw-text-sm tw-font-semibold'>
                Nombre de la recompensa
              </label>
              <TextField
                className=''
                value={values.name}
                onChange={handleChange}
                name='name'
                placeholder='Inserte el nombre de la recompensa'
                fullWidth
                error={!!errors.name}
              />
              {errors.name && (
                <p className='tw-text-red-500 tw-text-sm'>{errors.name}</p>
              )}
            </div>
            <div>
              <label className='tw-text-sm tw-font-semibold'>
                Ingrese la descripción de la recompensa
              </label>
              <TextareaAutosize
                className={`tw-w-full p-2 border rounded bg-white text-black tw-resize-none ${
                  errors.description
                    ? 'tw-border-red-500 tw-outline-none tw-ring-red-500'
                    : ''
                } rounded-md`}
                value={values.description}
                onChange={handleChange}
                name='description'
                placeholder='Ingrese la descripción de la recompensa'
              />
              {errors.description && (
                <p className='tw-text-red-500 tw-text-sm'>
                  {errors.description}
                </p>
              )}
            </div>
            <div>
              <label className='tw-text-sm tw-font-semibold'>
                Numero de actividad a completar para obtenerla
              </label>
              <p className='tw-text-xs tw-font-light tw-text-gray-500'>
                Ingrese el número de actividades que el estudiante debe
                completar para esta recompensa
              </p>
              <div className='tw-flex tw-items-center tw-justify-center tw-gap-2'>
                <button
                  type='button'
                  onClick={decrement}
                  className='tw-bg-white tw-text-black'
                >
                  -
                </button>
                <div className='tw-p-4 border tw-w-10 tw-h-10 tw-flex tw-items-center tw-justify-center'>
                  {numberOfActivities}
                </div>

                <button
                  type='button'
                  onClick={increment}
                  className='tw-bg-white tw-text-black'
                >
                  +
                </button>
              </div>
            </div>
            <div className='tw-flex tw-items-center tw-gap-2'>
              <button
                onClick={closeModal}
                type='button'
                className=' tw-bg-white tw-text-black border tw-w-full'
              >
                Cancelar
              </button>
              <button
                type='submit'
                className={cn(
                  'tw-w-full',
                  !!errors.name || !!errors.description
                    ? 'tw-bg-gray-200 tw-text-black'
                    : 'tw-bg-primary-500 tw-text-white'
                )}
                disabled={isSubmitting || !!errors.name || !!errors.description}
              >
                Guardar recompensa
              </button>
            </div>
          </form>
        )}
      </Formik>
    );
  }

  return <div />;
}
