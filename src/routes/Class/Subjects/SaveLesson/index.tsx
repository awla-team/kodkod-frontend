import { Button, TextField } from '@mui/material';
import BoltIcon from '@mui/icons-material/Bolt';
import WaterIcon from '@mui/icons-material/Water';
import PsychologyIcon from '@mui/icons-material/Psychology';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import kodkod from 'assets/images/kodcoin.png';

import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { type IUnit } from 'components/Modals/ViewLearningGoalsDialog/interfaces';
import StaticRewardCard from 'components/RewardCard/StaticRewardCard';
import type IActivity from 'types/models/Activity';
import { type ILessonSaved } from 'types/models/Lesson';
import { type ITeacherSubjectClassroomData } from 'global/interfaces';
import { Formik } from 'formik';
import { saveLesson } from 'services/lessons';
import Toaster from 'utils/Toster';

const SaveLesson: React.FC<{
  classroomDetails: ITeacherSubjectClassroomData;
  selectedUnit: IUnit;
  handleClose: () => void;
}> = ({ classroomDetails, selectedUnit, handleClose }) => {
  const [formValues] = useState<FormInput>({
    title: '',
    classroom_id: classroomDetails.classroom_id,
    unit_id: selectedUnit.id,
  });

  const onSubmit = async (values: FormInput) => {
    try {
      const lesson: ILessonSaved = {
        title: values.title,
        index: 1,
        classroom_id: values.classroom_id,
        unit_id: values.unit_id,
      };
      const { status } = await saveLesson(lesson);

      if (status === 200) {
        Toaster('success', 'Clase creada');
        handleClose();
      }
    } catch (e) {
      console.log(e);
      Toaster('error', 'Error al crear clase');
    }
  };

  useEffect(() => {});

  return (
    <Formik initialValues={formValues} onSubmit={onSubmit}>
      {({ values, handleChange, handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          <div className='tw-space-y-6'>
            <Link className='fw-bold tw-flex' onClick={handleClose}>
              {'< Volver a lista de clases'}
            </Link>

            <h5 className='tw-flex tw-gap-4'>
              {selectedUnit.title.includes('Unidad')
                ? selectedUnit.title
                : 'Unidad ' + selectedUnit.title}
            </h5>

            <TextField
              className=''
              value={values.title}
              onChange={handleChange}
              name='title'
              variant='standard'
              placeholder='Inserte el título de la clase'
              fullWidth
            />

            <h5 className='tw-flex tw-mx-4 tw-my-4'>
              1. Tus estudiantes completan al menos 2 desafíos de la clase
            </h5>
            <div className='tw-border tw-border-dashed tw-rounded-md tw-h-40 tw-flex tw-justify-between tw-items-center hover:tw-cursor-pointer tw-transition-all tw-duration-200 tw-ease-in-out tw-bg-transparent hover:tw-bg-indigo-100'>
              <div className='tw-justify-center tw-items-center tw-w-[100px] tw-h-full tw-py-0 tw-px-6 tw-flex tw-flex-col tw-gap-1tw-flex tw-bg-[#0E8A1A] tw-text-white tw-rounded-l-md tw-border-y-2 tw-border-transparent'>
                <BoltIcon />
                Inicio
              </div>
              <div className='tw-flex tw-justify-center tw-items-center'>
                <AddCircleOutlinedIcon />
                <span className='tw-text-sm tw-mx-2 tw-font-semibold'>
                  Añade una actividad de inicio
                </span>
              </div>
              <div />
            </div>
            <div className='tw-border tw-border-dashed tw-rounded-md tw-h-40 tw-flex tw-justify-between tw-items-center hover:tw-cursor-pointer tw-transition-all tw-duration-200 tw-ease-in-out tw-bg-transparent hover:tw-bg-indigo-100'>
              <div className='tw-justify-center tw-items-center tw-w-[100px] tw-h-full tw-py-0 tw-px-6 tw-flex tw-flex-col tw-gap-1tw-flex tw-bg-[#0E138A] tw-text-white tw-rounded-l-md tw-border-y-2 tw-border-transparent'>
                <PsychologyIcon />
                Desarrollo
              </div>
              <div className='tw-flex tw-justify-center tw-items-center'>
                <AddCircleOutlinedIcon />
                <span className='tw-text-sm tw-mx-2 tw-font-semibold'>
                  Añade una actividad de desarrollo
                </span>
              </div>
              <div />
            </div>
            <div className='tw-border tw-border-dashed tw-rounded-md tw-h-40 tw-flex tw-justify-between tw-items-center hover:tw-cursor-pointer tw-transition-all tw-duration-200 tw-ease-in-out tw-bg-transparent hover:tw-bg-indigo-100'>
              <div className='tw-justify-center tw-items-center tw-w-[100px] tw-h-full tw-py-0 tw-px-6 tw-flex tw-flex-col tw-gap-1tw-flex tw-bg-[#8A0E0E] tw-text-white tw-rounded-l-md tw-border-y-2 tw-border-transparent'>
                <WaterIcon />
                Cierre
              </div>
              <div className='tw-flex tw-justify-center tw-items-center'>
                <AddCircleOutlinedIcon />
                <span className='tw-text-sm tw-mx-2 tw-font-semibold'>
                  Añade una actividad de cierre
                </span>
              </div>
              <div />
            </div>

            <h5 className='tw-flex tw-mx-4 tw-my-4'>
              2. Al completarlos, ¡pueden elegir una recompensa!
            </h5>
            <div className='tw-grid tw-grid-cols-3 tw-gap-20'>
              <div className='tw-border tw-mx-6 tw-border-dashed tw-rounded-md tw-h-80 tw-w-60 tw-flex tw-justify-center tw-items-center tw-flex-col hover:tw-cursor-pointer tw-transition-all tw-duration-200 tw-ease-in-out tw-bg-transparent hover:tw-bg-indigo-100'>
                <AddCircleOutlinedIcon />
                <span className='tw-text-sm tw-font-semibold'>
                  Añade una recompensa
                </span>
              </div>
              <div className='tw-border tw-border-dashed tw-rounded-md tw-h-80 tw-w-60 tw-flex tw-justify-center tw-items-center tw-flex-col hover:tw-cursor-pointer tw-transition-all tw-duration-200 tw-ease-in-out tw-bg-transparent hover:tw-bg-indigo-100'>
                <AddCircleOutlinedIcon />
                <span className='tw-text-sm tw-font-semibold'>
                  Añade una recompensa
                </span>
              </div>
              <div className='tw-border tw-border-dashed tw-rounded-md tw-h-80 tw-w-60 tw-flex tw-justify-center tw-items-center tw-flex-col hover:tw-cursor-pointer tw-transition-all tw-duration-200 tw-ease-in-out tw-bg-transparent hover:tw-bg-indigo-100'>
                <AddCircleOutlinedIcon />
                <span className='tw-text-sm tw-font-semibold'>
                  Añade una recompensa
                </span>
              </div>
            </div>
            <div hidden>
              <StaticRewardCard
                description='Descripcion de Prueba'
                icon={kodkod}
                title='Test'
              />
            </div>
            <h5 className='tw-flex tw-mx-4 tw-my-4'>
              3. Las recompensas pueden utilizarse en los últimos 15 minutos de
              la clase. ¡Buena suerte!
            </h5>
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
  );
};

export default SaveLesson;
