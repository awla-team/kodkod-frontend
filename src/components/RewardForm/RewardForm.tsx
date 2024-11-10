import { useState } from 'react';
import { Formik } from 'formik';
import { Button, DialogActions, TextField } from '@mui/material';
import { useModalStore } from 'contexts/ZustandContext/modal-context';
import {
  type CreateRewardForm,
  CreateRewardSchema,
} from 'types/validations/reward';
import { useCreateLesson } from 'zustand/create-lesson-store';
import Toaster from 'utils/Toster';

interface Props {
  reward?: {
    id?: number;
    title: string;
    description: string;
  };
  index: number;
}

const RewardForm: React.FC<Props> = ({ reward, index }) => {
  const [formValues] = useState<CreateRewardForm>({
    name: reward ? reward.title : '',
    description: reward ? reward.description : '',
  });
  const [numberOfActivities, setNumberOfActivities] = useState<number>(1);
  const { closeModal } = useModalStore();
  const { addReward, editReward } = useCreateLesson();
  const editMode = !!reward;

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

    if (editMode) {
      editReward(data, index);
    } else {
      addReward(data);
    }
    closeModal();
    Toaster('success', `Recompensa agregada`);
  };

  return (
    <Formik
      initialValues={formValues}
      validationSchema={CreateRewardSchema}
      onSubmit={onSubmit}
    >
      {({ values, handleChange, handleSubmit, isSubmitting, errors }) => (
        <form onSubmit={handleSubmit}>
          <div className='tw-flex tw-flex-col tw-gap-4'>
            <div>
              <TextField
                value={values.name}
                onChange={handleChange}
                name='name'
                label='Nombre'
                variant='outlined'
                placeholder='Nombre de la recompensa'
                fullWidth
                error={!!errors.name}
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
                placeholder='Descripción de la recompensa'
                error={!!errors.description}
              />
            </div>
            <div>
              <label className='tw-text-sm tw-text-center tw-w-full tw-mb-2'>
                N° de actividades requeridas para obtener la recompensa
              </label>
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
            <DialogActions>
              <Button variant='outlined' onClick={closeModal}>
                Cancelar
              </Button>
              <Button
                variant='contained'
                type='submit'
                disabled={isSubmitting || !values.name || !values.description}
              >
                Guardar recompensa
              </Button>
            </DialogActions>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default RewardForm;
