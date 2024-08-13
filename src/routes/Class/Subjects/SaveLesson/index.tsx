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
import ViewSaveActivityDialog from 'components/Modals/SaveActivity';
import { useCreateLesson } from 'zustand/create-lesson-store';
import { saveActivity } from 'services/activities';
import { CreateLessonSchema } from 'types/validations/lesson';

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
  const [openSaveActivity, setOpenSaveActivity] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<string>('');
  const { initialActivity, secondActivity, finalActivity, clearActivity } =
    useCreateLesson();

  const onSubmit = async (values: FormInput) => {
    try {
      if (!initialActivity || !secondActivity || !finalActivity) {
        Toaster('error', 'Falta una actividad');
        return;
      }

      const lesson: ILessonSaved = {
        title: values.title,
        index: 1,
        classroom_id: values.classroom_id,
        unit_id: values.unit_id,
      };
      const { status } = await saveLesson(lesson);

      if (status === 200) {
        const [firstResponse, secondResponse, thirdResponse] =
          await Promise.all([
            saveActivity(initialActivity),
            saveActivity(secondActivity),
            saveActivity(finalActivity),
          ]);

        if (
          firstResponse.status === 201 &&
          secondResponse.status === 201 &&
          thirdResponse.status === 201
        ) {
          Toaster('success', 'Clase creada con éxito');
          clearActivity();
          handleClose();
        } else {
          Toaster('error', 'Error al crear clase');
        }
      }
    } catch (e) {
      console.log(e);
      Toaster('error', 'Error al crear clase');
    }
  };

  useEffect(() => {});

  const goBack = () => {
    clearActivity();
    handleClose();
  };

  return (
    <div>
      <Formik
        initialValues={formValues}
        onSubmit={onSubmit}
        validationSchema={CreateLessonSchema}
      >
        {({ values, handleChange, handleSubmit, isSubmitting, errors }) => (
          <>
            <form onSubmit={handleSubmit}>
              <div className='tw-space-y-6'>
                <Link className='fw-bold tw-flex' onClick={goBack}>
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
                  error={!!errors.title}
                />
                {errors.title && (
                  <span className='tw-text-xs tw-text-red-500'>
                    {errors.title}
                  </span>
                )}

                <h5 className='tw-flex tw-mx-4 tw-my-4'>
                  1. Tus estudiantes completan al menos 2 desafíos de la clase
                </h5>
                <div className='tw-border tw-border-dashed tw-rounded-md tw-h-40 tw-flex tw-justify-between tw-items-center hover:tw-cursor-pointer tw-transition-all tw-duration-200 tw-ease-in-out tw-bg-transparent hover:tw-bg-indigo-100'>
                  <div className='tw-justify-center tw-items-center tw-w-[100px] tw-h-full tw-py-0 tw-px-6 tw-flex tw-flex-col tw-gap-1tw-flex tw-bg-[#0E8A1A] tw-text-white tw-rounded-l-md tw-border-y-2 tw-border-transparent'>
                    <BoltIcon />
                    Inicio
                  </div>
                  {initialActivity ? (
                    <div className='tw-flex tw-flex-col tw-justify-center tw-items-center tw-w-full tw-bg-green-100 tw-h-full'>
                      <h5>{initialActivity.title}</h5>
                      <p className='tw-text-sm tw-mx-2 tw-font-semibold'>
                        {initialActivity.description}
                      </p>
                    </div>
                  ) : (
                    <div
                      className='tw-flex tw-justify-center tw-items-center tw-w-full tw-h-full'
                      onClick={() => {
                        setOpenSaveActivity(true);
                        setSelectedType('Inicio');
                      }}
                    >
                      <AddCircleOutlinedIcon />
                      <span className='tw-text-sm tw-mx-2 tw-font-semibold'>
                        Añade una actividad de inicio
                      </span>
                    </div>
                  )}
                  <div />
                </div>
                <div className='tw-border tw-border-dashed tw-rounded-md tw-h-40 tw-flex tw-justify-between tw-items-center hover:tw-cursor-pointer tw-transition-all tw-duration-200 tw-ease-in-out tw-bg-transparent hover:tw-bg-indigo-100'>
                  <div className='tw-justify-center tw-items-center tw-w-[100px] tw-h-full tw-py-0 tw-px-6 tw-flex tw-flex-col tw-gap-1tw-flex tw-bg-[#0E138A] tw-text-white tw-rounded-l-md tw-border-y-2 tw-border-transparent'>
                    <PsychologyIcon />
                    Desarrollo
                  </div>
                  {secondActivity ? (
                    <div className='tw-flex tw-flex-col tw-justify-center tw-items-center tw-w-full tw-bg-[#0E138A]/10 tw-h-full'>
                      <h5>{secondActivity.title}</h5>
                      <p className='tw-text-sm tw-mx-2 tw-font-semibold'>
                        {secondActivity.description}
                      </p>
                    </div>
                  ) : (
                    <div
                      className='tw-flex tw-justify-center tw-items-center tw-w-full tw-h-full'
                      onClick={() => {
                        setOpenSaveActivity(true);
                        setSelectedType('Desarrollo');
                      }}
                    >
                      <AddCircleOutlinedIcon />
                      <span className='tw-text-sm tw-mx-2 tw-font-semibold'>
                        Añade una actividad de desarrollo
                      </span>
                    </div>
                  )}
                  <div />
                </div>
                <div className='tw-border tw-border-dashed tw-rounded-md tw-h-40 tw-flex tw-justify-between tw-items-center hover:tw-cursor-pointer tw-transition-all tw-duration-200 tw-ease-in-out tw-bg-transparent hover:tw-bg-indigo-100'>
                  <div className='tw-justify-center tw-items-center tw-w-[100px] tw-h-full tw-py-0 tw-px-6 tw-flex tw-flex-col tw-gap-1tw-flex tw-bg-[#8A0E0E] tw-text-white tw-rounded-l-md tw-border-y-2 tw-border-transparent'>
                    <WaterIcon />
                    Cierre
                  </div>
                  {finalActivity ? (
                    <div className='tw-flex tw-flex-col tw-justify-center tw-items-center tw-w-full tw-bg-red-100 tw-h-full'>
                      <h5>{finalActivity.title}</h5>
                      <p className='tw-text-sm tw-mx-2 tw-font-semibold'>
                        {finalActivity.description}
                      </p>
                    </div>
                  ) : (
                    <div
                      className='tw-flex tw-justify-center tw-items-center tw-w-full tw-h-full'
                      onClick={() => {
                        setOpenSaveActivity(true);
                        setSelectedType('Cierre');
                      }}
                    >
                      <AddCircleOutlinedIcon />
                      <span className='tw-text-sm tw-mx-2 tw-font-semibold'>
                        Añade una actividad de cierre
                      </span>
                    </div>
                  )}
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
                  3. Las recompensas pueden utilizarse en los últimos 15 minutos
                  de la clase. ¡Buena suerte!
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
                    className='tw-bg-primary'
                    disabled={isSubmitting}
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </form>
            <ViewSaveActivityDialog
              open={openSaveActivity}
              currentType={selectedType}
              currentLesson={{
                id: 1,
                title: values.title,
                index: 1,
                classroom_id: values.classroom_id,
                unit_id: values.unit_id,
              }}
              handleClose={() => setOpenSaveActivity(false)}
            />
          </>
        )}
      </Formik>
    </div>
  );
};

export default SaveLesson;
