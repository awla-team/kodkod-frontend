import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import EditIcon from '@mui/icons-material/Edit';
import { type ILessonSaved } from 'types/models/Lesson';
import { type ITeacherSubjectClassroomData } from 'global/interfaces';
import { Formik } from 'formik';
import { saveLesson } from 'services/lessons';
import Toaster from 'utils/Toster';
import { useCreateLesson } from 'zustand/create-lesson-store';
import { saveActivity } from 'services/activities';
import { CreateLessonSchema } from 'types/validations/lesson';
import { useModalStore } from 'contexts/ZustandContext/modal-context';
import { createRewards } from 'services/rewards';
import PostcardIcon from 'assets/images/postcard-heart.svg';
import BookmarkStarIcon from 'assets/images/bookmark-star.svg';
import type IActivity from 'types/models/Activity';
import { type IActivitySaved } from 'types/models/Activity';
import ConfirmationForm from 'components/ConfirmationForm';
import ActivityForm from 'components/ActivityForm';
import RewardCard from 'components/RewardCard';
import RewardForm from 'components/RewardForm';
import ActivityCard, { ActiviyCardEditRender } from 'components/ActivityCard';

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
  const [openDeleteReward, setOpenDeleteReward] = useState<boolean>(false);
  const [selectedActivity, setSelectedActivity] = useState<IActivitySaved>();
  const [selectedActivityIndex, setSelectedActivityIndex] = useState<number>(0);
  const [selectedRewardIndex, setSelectedRewardIndex] = useState<number>(0);
  const {
    activities,
    clearNewLessonData,
    rewards,
    deleteActivity,
    deleteReward,
  } = useCreateLesson();

  const onSubmit = async (values: FormInput) => {
    try {
      const lesson: ILessonSaved = {
        title: values.title,
        index: 1,
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

  const submitDeleteActivity = (index: number) => {
    try {
      deleteActivity(index);
      Toaster('success', `Actividad eliminada`);
    } catch (e) {
      console.log(e);
      Toaster('error', 'Error al eliminar actividad');
    }
  };

  const submitDeleteReward = (index: number) => {
    try {
      deleteReward(index);

      Toaster('success', `Recompensa eliminada`);
    } catch (error) {
      console.error(error);

      Toaster('error', `Error al eliminar recompensa`);
    }
  };

  const goBack = () => {
    clearNewLessonData();
    handleClose();
  };

  const handleEditActivity = (index: number, activity: IActivitySaved) => {
    setSelectedActivityIndex(index);
    setSelectedActivity(activity);
    setOpenEditActivity(true);
  };

  const handleDeleteActivity = (index: number, activity: IActivitySaved) => {
    setSelectedActivityIndex(index);
    setSelectedActivity(activity);
    setOpenDeleteActivity(true);
  };

  return (
    <Formik
      initialValues={formValues}
      onSubmit={onSubmit}
      validationSchema={CreateLessonSchema}
    >
      {({ values, handleChange, handleSubmit, isSubmitting, errors }) => (
        <>
          <form onSubmit={handleSubmit}>
            <div>
              <TextField
                value={values.title}
                sx={{
                  '& .MuiInputBase-input': {
                    fontSize: '24px',
                  },
                }}
                onChange={handleChange}
                name='title'
                variant='standard'
                placeholder='Ingresa el tema de la clase'
                fullWidth
                error={!!errors.title}
              />
              <div className='tw-flex tw-flex-col tw-gap-4'>
                <span className='tw-block tw-mt-8'>
                  1. Ingresa las <b>actividades</b> que quieras desarrollar en
                  esta clase
                </span>
                <div className='tw-flex tw-flex-col tw-gap-2 tw-scroll-auto tw-overflow-y-auto'>
                  {activities?.map(
                    (
                      { title, description, lesson_id: lessonId, type },
                      index
                    ) => {
                      return (
                        <ActivityCard
                          key={index}
                          activity={{
                            title,
                            description,
                            lesson_id: lessonId,
                            type,
                            studentsCompletedActivity: 0,
                          }}
                          editRender={
                            <ActiviyCardEditRender
                              edit={() =>
                                handleEditActivity(index, {
                                  title,
                                  description,
                                  lesson_id: lessonId,
                                  type,
                                })
                              }
                              delete={() =>
                                handleDeleteActivity(index, {
                                  title,
                                  description,
                                  lesson_id: lessonId,
                                  type,
                                })
                              }
                            />
                          }
                        />
                      );
                    }
                  )}
                  <div className='border-dashed tw-rounded-md tw-h-40 tw-flex hover:tw-cursor-pointer tw-transition-all tw-duration-200 tw-ease-in-out tw-bg-transparent hover:tw-bg-sky-50'>
                    <div
                      className='tw-flex tw-justify-center tw-items-center tw-w-full tw-h-full tw-gap-2'
                      onClick={() => {
                        setOpenSaveActivity(true);
                      }}
                    >
                      <img
                        src={PostcardIcon}
                        alt='Postcard'
                        className='tw-w-5'
                      />
                      <span className='tw-text-lg'>
                        Ingresar nueva actividad
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className='tw-flex tw-flex-col tw-gap-4'>
                <span className='tw-block tw-mt-6'>
                  2. Ingresa las <b>recompensas</b> de la clase{' '}
                  <i className='tw-text-xs tw-text-gray-500'>(opcional)</i>
                </span>
                <div
                  className={`tw-flex tw-gap-5 tw-scroll-auto tw-overflow-x-auto ${
                    rewards.length > 0 ? '' : 'tw-justify-center'
                  }`}
                >
                  {rewards.map((reward, index) => {
                    return (
                      <RewardCard
                        key={index}
                        reward={{
                          id: 0,
                          lesson_id: 0,
                          title: reward.name,
                          description: reward.description,
                          n_required: reward.numberOfActivities,
                        }}
                        editEffect={() =>
                          openModal({
                            title: 'Editar recompensa',
                            content: (
                              <RewardForm
                                reward={{
                                  title: reward.name,
                                  description: reward.description,
                                }}
                                index={index}
                              />
                            ),
                            maxWidth: 'sm',
                            withActions: false,
                          })
                        }
                        deleteEffect={() => {
                          setSelectedRewardIndex(index);
                          setOpenDeleteReward(true);
                        }}
                      />
                    );
                  })}
                  <div
                    className={`${
                      rewards.length ? 'tw-m-0' : 'tw-m-auto'
                    } tw-flex tw-flex-col tw-gap-2 tw-rounded-md tw-items-center tw-justify-center border-dashed tw-max-h-[400px] tw-h-[400px] tw-min-w-[260px] tw-w-[260px] hover:tw-cursor-pointer tw-transition-all tw-duration-200 tw-ease-in-out tw-bg-transparent hover:tw-bg-sky-50`}
                    onClick={() =>
                      openModal({
                        title: 'Ingresar recompensas',
                        content: <RewardForm index={0} />,
                        maxWidth: 'sm',
                        withActions: false,
                      })
                    }
                  >
                    <img
                      src={BookmarkStarIcon}
                      alt='Postcard'
                      className='tw-w-5'
                    />
                    <span className='tw-text-lg'>
                      Ingresar nueva recompensa
                    </span>
                  </div>
                </div>
              </div>
              <span className='tw-block tw-mt-6'>
                3. Cuando tengas todo listo, haz click en <b>Guardar clase</b> y
                podrás empezar a utilizarla.
              </span>
            </div>
            <div className='tw-fixed tw-bottom-0 tw-left-0 tw-w-full tw-flex tw-items-center tw-justify-between tw-bg-white tw-border-t tw-py-2 tw-px-5 border-gray'>
              <div className='tw-flex tw-items-center tw-justify-center tw-gap-2 tw-ml-[83px]'>
                <EditIcon className='tw-w-5 tw-h-5' />
                <span>
                  Estás en el <b>modo de edición</b>
                </span>
              </div>
              <div className='tw-flex tw-items-center tw-justify-end tw-gap-2'>
                <Button onClick={goBack} variant='outlined' size='large'>
                  Cancelar
                </Button>
                <Button
                  type='submit'
                  variant='contained'
                  size='large'
                  disabled={isSubmitting || !values.title}
                >
                  Guardar clase
                </Button>
              </div>
            </div>
          </form>
          {/* Activity Section */}
          {openEditActivity && selectedActivity && (
            <ActivityForm
              open={openEditActivity}
              activity={selectedActivity as IActivity}
              index={selectedActivityIndex}
              currentLesson={{
                id: 1,
                title: values.title,
                index: 1,
              }}
              handleClose={() => {
                setOpenEditActivity(false);
              }}
            />
          )}
          <ActivityForm
            open={openSaveActivity}
            activity={null}
            currentLesson={{
              id: 1,
              title: values.title,
              index: 1,
            }}
            handleClose={() => {
              setOpenSaveActivity(false);
            }}
          />
          <ConfirmationForm
            open={openDeleteActivity}
            title='Eliminar actividad'
            description='Desea eliminar esta actividad?'
            onSubmit={() => {
              submitDeleteActivity(selectedActivityIndex);
            }}
            onClose={() => setOpenDeleteActivity(false)}
          />
          {/* Rewards Section */}
          <ConfirmationForm
            open={openDeleteReward}
            title='Eliminar recompensa'
            description='Desea eliminar esta recompensa?'
            onSubmit={() => {
              submitDeleteReward(selectedRewardIndex);
            }}
            onClose={() => setOpenDeleteReward(false)}
          />
        </>
      )}
    </Formik>
  );
};

export default SaveLesson;
