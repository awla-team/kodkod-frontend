import { Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import PostcardIcon from 'assets/images/postcard-heart.svg';
import BookmarkStarIcon from 'assets/images/bookmark-star.svg';
import type ILesson from 'types/models/Lesson';
import { type ILessonSaved } from 'types/models/Lesson';
import { Formik } from 'formik';
import { editLesson } from 'services/lessons';
import Toaster from 'utils/Toster';
import { useCreateLesson } from 'zustand/create-lesson-store';
import { eraseActivity, editActivity, saveActivity } from 'services/activities';
import { CreateLessonSchema } from 'types/validations/lesson';
import { useModalStore } from 'contexts/ZustandContext/modal-context';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { createRewards, eraseReward, updateReward } from 'services/rewards';
import type IActivity from 'types/models/Activity';
import type IReward from 'types/models/Reward';
import { type IActivitySaved } from 'types/models/Activity';
import ConfirmationForm from 'components/ConfirmationForm';
import ActivityForm from 'components/ActivityForm';
import RewardCard from 'components/RewardCard';
import RewardForm from 'components/RewardForm';
import ActivityCard, { ActiviyCardEditRender } from 'components/ActivityCard';

const EditLesson: React.FC<{
  selectedLesson: ILesson;
  lessonActivities?: IActivity[];
  lessonRewards?: IReward[];
  handleClose: () => void;
}> = ({ selectedLesson, lessonActivities, lessonRewards, handleClose }) => {
  const { openModal } = useModalStore();
  const [formValues] = useState<FormInput>({
    title: selectedLesson.title,
    teacher_subject_classroom_id: selectedLesson.teacher_subject_classroom_id,
  });
  const [openSaveActivity, setOpenSaveActivity] = useState<boolean>(false);
  const [openEditNewActivity, setOpenEditNewActivity] =
    useState<boolean>(false);
  const [openDeleteActivity, setOpenDeleteActivity] = useState<boolean>(false);
  const [openDeleteNewActivity, setOpenDeleteNewActivity] =
    useState<boolean>(false);
  const [openEditActivity, setOpenEditActivity] = useState<boolean>(false);
  const [openDeleteReward, setOpenDeleteReward] = useState<boolean>(false);
  const [selectedEditedActivity, setSelectedEditedActivity] =
    useState<IActivity>();
  const [selectedNewActivity, setSelectedNewActivity] =
    useState<IActivitySaved>();
  const [selectedReward, setSelectedReward] = useState<IReward>();
  const [selectedActivityIndex, setSelectedActivityIndex] = useState<number>(0);
  const [selectedRewardIndex, setSelectedRewardIndex] = useState<number>(0);
  const [activitiesDeleteList, setActivitiesDeleteList] = useState<number[]>(
    []
  );
  const [rewardsDeleteList, setRewardsDeleteList] = useState<number[]>([]);
  const {
    clearEditLessonData,
    clearNewLessonData,
    setEditLessonData,
    deleteActivity,
    deleteEditLessonActivity,
    deleteEditLessonReward,
    deleteReward,
    editLessonActivities,
    editLessonRewards,
    rewards,
    activities,
  } = useCreateLesson();

  const loadLessonData = () => {
    if (lessonActivities && lessonRewards) {
      setEditLessonData(lessonActivities, lessonRewards);
    }
  };

  const activitiesListAdd = (activity: IActivity) => {
    if (activity && activitiesDeleteList) {
      setActivitiesDeleteList([activity.id, ...activitiesDeleteList]);
    }
  };

  const submitDeleteActivity = (activity: IActivity, index: number) => {
    try {
      if (activity.id != null) {
        deleteEditLessonActivity(index);
        activitiesListAdd(activity);
        Toaster('success', `Actividad eliminada`);
      } else {
        deleteActivity(index);

        Toaster('success', `Actividad eliminada`);
      }
    } catch (e) {
      console.log(e);
      Toaster('error', 'Error al eliminar actividad');
    }
  };

  const submitDeleteReward = (index: number, reward: IReward) => {
    try {
      if (reward.id != null) {
        deleteEditLessonReward(index);
        setRewardsDeleteList([...(rewardsDeleteList || []), reward.id]);

        Toaster('success', `Recompensa eliminada`);
      } else {
        deleteReward(index);
        Toaster('success', `Recompensa eliminada`);
      }
    } catch (error) {
      console.error(error);

      Toaster('error', `Error al eliminar recompensa`);
    }
  };

  const onSubmit = async (values: FormInput) => {
    try {
      const lesson: ILessonSaved = {
        title: values.title,
        index: 1,
        teacher_subject_classroom_id: values.teacher_subject_classroom_id,
      };
      const { status } = await editLesson(lesson, selectedLesson.id);

      if (status === 200) {
        const editActivitiesResponse = await Promise.all(
          editLessonActivities.map(async (activity) => {
            const editedActivity = {
              title: activity.title,
              description: activity.description,
              lesson_id: selectedLesson.id,
              type: activity.type,
            };
            return await editActivity(editedActivity, activity.id);
          })
        );

        const editRewardsResponse = await Promise.all(
          editLessonRewards.map(async (reward) => {
            const editedReward = {
              title: reward.title,
              description: reward.description,
              n_required: reward.n_required,
              lesson_id: selectedLesson.id,
            };
            return await updateReward(reward.id, editedReward);
          })
        );

        if (activitiesDeleteList && activitiesDeleteList.length > 0) {
          const deleteActivityResponse = await Promise.all(
            activitiesDeleteList.map(
              async (activityId) => await eraseActivity(activityId)
            )
          );
        }
        if (rewardsDeleteList && rewardsDeleteList.length > 0) {
          const deletRewardResponse = await Promise.all(
            rewardsDeleteList.map(
              async (rewardId) => await eraseReward(rewardId)
            )
          );
        }

        if (rewards.length > 0 && activities.length > 0) {
          const rewardsData = rewards.map((reward) => ({
            title: reward.name,
            description: reward.description,
            n_required: reward.numberOfActivities,
            lesson_id: selectedLesson.id,
          }));
          const newRewardsResponse = await createRewards(rewardsData);
          const newActivitiesResponse = await Promise.all(
            activities.map(async (activity) => await saveActivity(activity))
          );

          if (
            newActivitiesResponse.every(
              (response) => response.status === 201
            ) &&
            editActivitiesResponse.every(
              (response) => response.status === 200
            ) &&
            newRewardsResponse.status === 201 &&
            editRewardsResponse.every((response) => response.status === 200)
          ) {
            Toaster('success', 'Clase editada con éxito');
            clearEditLessonData();
            clearNewLessonData();
            handleClose();
          } else {
            Toaster('error', 'Error al editar clase');
          }
        } else if (rewards.length > 0) {
          const rewardsData = rewards.map((reward) => ({
            title: reward.name,
            description: reward.description,
            n_required: reward.numberOfActivities,
            lesson_id: selectedLesson.id,
          }));
          const newRewardsResponse = await createRewards(rewardsData);

          if (
            editActivitiesResponse.every(
              (response) => response.status === 200
            ) &&
            newRewardsResponse.status === 201 &&
            editRewardsResponse.every((response) => response.status === 200)
          ) {
            Toaster('success', 'Clase editada con éxito');
            clearEditLessonData();
            clearNewLessonData();
            handleClose();
          } else {
            Toaster('error', 'Error al editar clase');
          }
        } else if (activities.length > 0) {
          const newActivitiesResponse = await Promise.all(
            activities.map(async (activity) => await saveActivity(activity))
          );

          if (
            newActivitiesResponse.every(
              (response) => response.status === 201
            ) &&
            editActivitiesResponse.every(
              (response) => response.status === 200
            ) &&
            editRewardsResponse.every((response) => response.status === 200)
          ) {
            Toaster('success', 'Clase editada con éxito');
            clearEditLessonData();
            clearNewLessonData();
            handleClose();
          } else {
            Toaster('error', 'Error al editar clase');
          }
        } else {
          if (
            editActivitiesResponse.every(
              (response) => response.status === 200
            ) &&
            editRewardsResponse.every((response) => response.status === 200)
          ) {
            Toaster('success', 'Clase editada con éxito');
            clearEditLessonData();
            clearNewLessonData();
            handleClose();
          } else {
            Toaster('error', 'Error al editar clase');
          }
        }
      }
    } catch (e) {
      console.log(e);
      Toaster('error', 'Error al editar clase');
    }
  };

  useEffect(() => {
    loadLessonData();
  }, [selectedLesson]);

  const goBack = () => {
    clearEditLessonData();
    clearNewLessonData();
    handleClose();
  };

  const handleEditActivity = (index: number, activity: IActivity) => {
    setSelectedActivityIndex(index);
    setSelectedEditedActivity(activity);
    setOpenEditActivity(true);
  };

  const handleDeleteActivity = (index: number, activity: IActivity) => {
    setSelectedActivityIndex(index);
    setSelectedEditedActivity(activity);
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
                  {editLessonActivities &&
                    editLessonActivities.length > 0 &&
                    editLessonActivities.map((activity, index) => {
                      return (
                        <ActivityCard
                          key={index}
                          activity={{
                            title: activity.title,
                            description: activity.description,
                            studentsCompletedActivity: 0,
                            lesson_id: selectedLesson.id,
                            type: activity.type,
                          }}
                          editRender={
                            <ActiviyCardEditRender
                              edit={() => handleEditActivity(index, activity)}
                              delete={() =>
                                handleDeleteActivity(index, activity)
                              }
                            />
                          }
                        />
                      );
                    })}
                  {activities &&
                    activities.length > 0 &&
                    activities.map((activity, index) => {
                      return (
                        <ActivityCard
                          key={index}
                          activity={{
                            title: activity.title,
                            description: activity.description,
                            studentsCompletedActivity: 0,
                            lesson_id: selectedLesson.id,
                            type: activity.type,
                          }}
                          editRender={
                            <ActiviyCardEditRender
                              edit={() => {
                                setSelectedActivityIndex(index);
                                setSelectedNewActivity(activity);
                                setOpenEditNewActivity(true);
                              }}
                              delete={() => {
                                setSelectedActivityIndex(index);
                                setSelectedNewActivity(activity);
                                setOpenDeleteNewActivity(true);
                              }}
                            />
                          }
                        />
                      );
                    })}
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
                    rewards.length + editLessonRewards.length > 0
                      ? ''
                      : 'tw-justify-center'
                  }`}
                >
                  {editLessonRewards &&
                    editLessonRewards.length > 0 &&
                    editLessonRewards.map((reward, index) => {
                      return (
                        <RewardCard
                          key={index}
                          reward={reward}
                          editEffect={() =>
                            openModal({
                              title: 'Editar recompensa',
                              content: (
                                <RewardForm index={index} reward={reward} />
                              ),
                              maxWidth: 'sm',
                              withActions: false,
                            })
                          }
                          deleteEffect={() => {
                            setSelectedRewardIndex(index);
                            setSelectedReward(reward);
                            setOpenDeleteReward(true);
                          }}
                        />
                      );
                    })}
                  {rewards &&
                    rewards.length > 0 &&
                    rewards.map((reward, index) => {
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
                                  index={index}
                                  reward={{
                                    title: reward.name,
                                    description: reward.description,
                                  }}
                                />
                              ),
                              maxWidth: 'sm',
                              withActions: false,
                            })
                          }
                          deleteEffect={() => {
                            setSelectedRewardIndex(index);
                            const innerReward = {
                              title: reward.name,
                              description: reward.description,
                              n_required: reward.numberOfActivities,
                            };
                            setSelectedReward(innerReward as IReward);
                            setOpenDeleteReward(true);
                          }}
                        />
                      );
                    })}
                  <div
                    className={`${
                      rewards.length + editLessonRewards.length > 0
                        ? 'tw-m-0'
                        : 'tw-m-auto'
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
          <ActivityForm
            open={openSaveActivity}
            activity={null}
            currentLesson={{
              id: selectedLesson.id,
              title: values.title,
              index: 1,
            }}
            handleClose={() => {
              setOpenSaveActivity(false);
            }}
          />
          {/* For already saved activities */}
          {openEditActivity && selectedEditedActivity && (
            <ActivityForm
              open={openEditActivity}
              index={selectedActivityIndex}
              activity={selectedEditedActivity}
              currentLesson={{
                id: selectedLesson.id,
                title: values.title,
                index: 1,
              }}
              handleClose={() => {
                setOpenEditActivity(false);
              }}
            />
          )}
          {openDeleteActivity && selectedEditedActivity && (
            <ConfirmationForm
              open={openDeleteActivity}
              title='Eliminar actividad'
              description='Desea eliminar esta actividad?'
              onSubmit={() => {
                submitDeleteActivity(
                  selectedEditedActivity,
                  selectedActivityIndex
                );
              }}
              onClose={() => setOpenDeleteActivity(false)}
            />
          )}
          {/* For new activities */}
          {openEditNewActivity && selectedNewActivity && (
            <ActivityForm
              open={openEditNewActivity}
              index={selectedActivityIndex}
              activity={selectedNewActivity as IActivity}
              currentLesson={{
                id: selectedLesson.id,
                title: values.title,
                index: 1,
              }}
              handleClose={() => {
                setOpenEditNewActivity(false);
              }}
            />
          )}
          {openDeleteNewActivity && selectedNewActivity && (
            <ConfirmationForm
              open={openDeleteNewActivity}
              title='Eliminar actividad'
              description='Desea eliminar esta actividad?'
              onSubmit={() => {
                submitDeleteActivity(
                  selectedNewActivity as IActivity,
                  selectedActivityIndex
                );
              }}
              onClose={() => setOpenDeleteNewActivity(false)}
            />
          )}
          {/* Rewards Section */}
          {openDeleteReward && selectedReward && (
            <ConfirmationForm
              open={openDeleteReward}
              title='Eliminar recompensa'
              description='Desea eliminar esta recompensa?'
              onSubmit={() => {
                submitDeleteReward(selectedRewardIndex, selectedReward);
              }}
              onClose={() => setOpenDeleteReward(false)}
            />
          )}
        </>
      )}
    </Formik>
  );
};

export default EditLesson;
