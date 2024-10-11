import { TextField } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import postCard from 'assets/images/postcard-heart 1.png';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { type ILessonSaved } from 'types/models/Lesson';
import { type ITeacherSubjectClassroomData } from 'global/interfaces';
import { Formik } from 'formik';
import { saveLesson } from 'services/lessons';
import Toaster from 'utils/Toster';
import ViewSaveActivityDialog from 'components/Modals/SaveActivity';
import { useCreateLesson } from 'zustand/create-lesson-store';
import { saveActivity } from 'services/activities';
import { CreateLessonSchema } from 'types/validations/lesson';
import { useModalStore } from 'contexts/ZustandContext/modal-context';
import CreateRewardModal from 'components/Modals/CreateRewardModal/CreateRewardModal';
import RewardCard from 'components/CreateReward/RewardCard';
import EditRewardModal from 'components/Modals/EditRewardModal';
import { createRewards } from 'services/rewards';
import ViewEditActivityDialog from 'components/Modals/EditActivity';
import DeleteRewardModalDialog from 'components/Modals/DeleteRewardModal';
import { type IActivitySaved } from 'types/models/Activity';
import ViewDeleteActivityDialog from 'components/Modals/DeleteActivity';

const SaveLesson: React.FC<{
  classroomDetails: ITeacherSubjectClassroomData;
  handleClose: () => void;
}> = ({ classroomDetails, handleClose }) => {
  const { openModal } = useModalStore();
  const [formValues] = useState<FormInput>({
    title: '',
    classroom_id: classroomDetails.classroom_id,
    teacher_subject_classroom_id: classroomDetails.id,
  });
  const [openSaveActivity, setOpenSaveActivity] = useState<boolean>(false);
  const [openEditActivity, setOpenEditActivity] = useState<boolean>(false);
  const [openDeleteActivity, setOpenDeleteActivity] = useState<boolean>(false);
  const [selectedActivity, setSelectedActivity] = useState<IActivitySaved>();
  const [selectedActivityIndex, setSelectedActivityIndex] = useState<number>(0);
  const { activities, clearNewLessonData, rewards } = useCreateLesson();

  const onSubmit = async (values: FormInput) => {
    try {
      const lesson: ILessonSaved = {
        title: values.title,
        index: 1,
        classroom_id: values.classroom_id,
        teacher_subject_classroom_id: classroomDetails.id,
      };
      const { status, data: newLesson } = await saveLesson(lesson);

      if (status === 200) {
        const activitiesData = activities.map((activity) => ({
          title: activity.title,
          description: activity.description,
          lesson_id: newLesson.id,
          type: activity.type,
        }));

        const activitiesResponse = await Promise.all(
          activitiesData.map(async (activity) => await saveActivity(activity))
        );

        const rewardsData = rewards.map((reward) => ({
          title: reward.name,
          description: reward.description,
          n_required: reward.numberOfActivities,
          lesson_id: newLesson.id,
        }));

        let rewardsResponse;
        if (rewardsData?.length === 0) rewardsResponse = { status: 201 };
        else rewardsResponse = await createRewards(rewardsData);

        if (
          activitiesResponse.every((response) => response.status === 201) &&
          rewardsResponse.status === 201
        ) {
          Toaster('success', 'Clase creada con éxito');
          clearNewLessonData();
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

  const goBack = () => {
    clearNewLessonData();
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
                  <h5>
                    <b>{'< Volver a lista de clases'}</b>
                  </h5>
                </Link>

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
                  1. Ingresa las <b className='tw-mx-1'> {' actividades '}</b>{' '}
                  que quieras desarrollar en esta clase
                </h5>
                <div className='tw-scroll-auto tw-overflow-y-auto tw-px-2 tw-pb-2 tw-max-h-[550px]'>
                  {activities && activities.length > 0 ? (
                    activities.map((activity, index) => {
                      return (
                        <div
                          key={index}
                          className='tw-border tw-bg-gradient-to-r tw-from-blue-600 tw-to-cyan-500 tw-rounded-md tw-min-h-40 tw-flex tw-my-3 tw-flex-col'
                        >
                          <div className='tw-flex tw-mx-8 tw-mt-8 tw-w-24'>
                            <h5
                              className='tw-flex tw-mr-4 tw-justify-center tw-text-white tw-border tw-border-none hover:tw-cursor-pointer tw-ease-in-out hover:tw-bg-indigo-300 hover:tw-border tw-rounded tw-transition-all tw-duration-200'
                              onClick={() => {
                                setSelectedActivityIndex(index);
                                setSelectedActivity(activity);
                                setOpenEditActivity(true);
                              }}
                            >
                              <EditNoteIcon />
                              Editar
                            </h5>

                            <h5
                              onClick={() => {
                                setSelectedActivityIndex(index);
                                setSelectedActivity(activity);
                                setOpenDeleteActivity(true);
                              }}
                              className='tw-flex tw-justify-center tw-text-white tw-border tw-border-none hover:tw-cursor-pointer tw-ease-in-out hover:tw-bg-indigo-300 hover:tw-border tw-rounded tw-transition-all tw-duration-200'
                            >
                              <DeleteForeverOutlinedIcon className='' />
                              Eliminar
                            </h5>
                          </div>

                          <div className=' tw-mx-8'>
                            <h3 className='tw-font-bold tw-text-white'>
                              {activity.title}
                            </h3>
                            <h5 className='tw-font-bold tw-text-white tw-break-all tw-mb-4'>
                              {activity.description}
                            </h5>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div />
                  )}
                  <div className='tw-border tw-border-dashed tw-rounded-md tw-h-40 tw-flex tw-items-center hover:tw-cursor-pointer tw-transition-all tw-duration-200 tw-ease-in-out tw-bg-transparent hover:tw-bg-indigo-100'>
                    <div
                      className='tw-flex tw-justify-center tw-items-center tw-w-full tw-h-full'
                      onClick={() => {
                        setOpenSaveActivity(true);
                      }}
                    >
                      <span className=' tw-mx-2 tw-font-semibold'>
                        <h5>
                          <img
                            src={postCard}
                            alt='book'
                            className='tw-w-6 tw-object-cover tw-mr-2'
                          />
                          <b> Ingresar nueva actividad</b>
                        </h5>
                      </span>
                    </div>
                  </div>
                </div>
                <h5 className='tw-flex tw-mx-4 tw-my-4'>
                  2. Ingresa las <b className='tw-mx-1'>{' recompensas '}</b> de
                  la clase
                </h5>
                <div className='tw-flex tw-justify-center tw-gap-5 tw-scroll-auto tw-overflow-x-auto tw-p-3'>
                  {rewards.map((reward, index) => {
                    return (
                      <RewardCard
                        key={index}
                        reward={reward}
                        editEffect={() =>
                          openModal({
                            title: 'Editar recompensa',
                            content: (
                              <EditRewardModal
                                newReward={reward}
                                index={index}
                              />
                            ),
                            maxWidth: 'sm',
                            withActions: false,
                          })
                        }
                        deleteEffect={() => {
                          openModal({
                            title: 'Eliminar recompensa',
                            content: (
                              <DeleteRewardModalDialog
                                editedReward={false}
                                index={index}
                              />
                            ),
                            maxWidth: 'sm',
                            withActions: false,
                          });
                        }}
                      />
                    );
                  })}
                  <div
                    className={`tw-border tw-w-auto tw-text-center tw-border-dashed tw-rounded-md ${
                      rewards.length > 0 ? 'tw-h-auto' : 'tw-h-96'
                    } tw-flex tw-justify-center tw-items-center tw-flex-col hover:tw-cursor-pointer tw-transition-all tw-duration-200 tw-ease-in-out tw-bg-transparent hover:tw-bg-indigo-100`}
                    onClick={() =>
                      openModal({
                        title: 'Ingresar recompensas',
                        content: <CreateRewardModal />,
                        maxWidth: 'sm',
                        withActions: false,
                      })
                    }
                  >
                    <AddBoxOutlinedIcon />
                    <span className='tw-text-sm tw-mx-12 tw-font-semibold'>
                      Añade una recompensa
                    </span>
                  </div>
                </div>
                <h5 className='tw-flex tw-mx-4 tw-my-4'>
                  3. Cuando tengas todo listo, haz click en
                  <b className='tw-mx-1'>{' Guardar Clase '}</b>y podrás empezar
                  a utilizarla.
                </h5>
                <div className='tw-flex tw-items-center tw-justify-end tw-mx-6'>
                  <button
                    onClick={goBack}
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
                    Guardar Clase
                  </button>
                </div>
              </div>
            </form>
            {openEditActivity && selectedActivity && (
              <ViewEditActivityDialog
                open={openEditActivity}
                newActivity={selectedActivity}
                index={selectedActivityIndex}
                currentLesson={{
                  id: 1,
                  title: values.title,
                  index: 1,
                  classroom_id: values.classroom_id,
                }}
                handleClose={() => {
                  setOpenEditActivity(false);
                }}
              />
            )}
            <ViewSaveActivityDialog
              open={openSaveActivity}
              currentLesson={{
                id: 1,
                title: values.title,
                index: 1,
                classroom_id: values.classroom_id,
              }}
              handleClose={() => {
                setOpenSaveActivity(false);
              }}
            />{' '}
            <ViewDeleteActivityDialog
              open={openDeleteActivity}
              index={selectedActivityIndex}
              handleClose={() => {
                setOpenSaveActivity(false);
              }}
            />
          </>
        )}
      </Formik>
    </div>
  );
};

export default SaveLesson;
