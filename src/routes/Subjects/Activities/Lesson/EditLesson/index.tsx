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
import ViewSaveActivityDialog from 'components/Modals/SaveActivity';
import { useCreateLesson } from 'zustand/create-lesson-store';
import {
  deleteActivity,
  editActivity,
  saveActivity,
} from 'services/activities';
import { CreateLessonSchema } from 'types/validations/lesson';
import { useModalStore } from 'contexts/ZustandContext/modal-context';
import CreateRewardModal from 'components/Modals/CreateRewardModal/CreateRewardModal';
import RewardCard from 'components/CreateReward/RewardCard';
import EditRewardModal from 'components/Modals/EditRewardModal';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { createRewards, deleteReward, updateReward } from 'services/rewards';
import ViewEditActivityDialog from 'components/Modals/EditActivity';
import type IActivity from 'types/models/Activity';
import type IReward from 'types/models/Reward';
import DeleteRewardModalDialog from 'components/Modals/DeleteRewardModal';
import { type IActivitySaved } from 'types/models/Activity';
import ViewDeleteActivityDialog from 'components/Modals/DeleteActivity';

const EditLesson: React.FC<{
  selectedLesson: ILesson;
  lessonActivities?: IActivity[];
  lessonRewards?: IReward[];
  handleClose: () => void;
}> = ({ selectedLesson, lessonActivities, lessonRewards, handleClose }) => {
  const { openModal } = useModalStore();
  const [formValues] = useState<FormInput>({
    title: selectedLesson.title,
    classroom_id: selectedLesson.classroom_id,
    teacher_subject_classroom_id: selectedLesson.teacher_subject_classroom_id,
  });
  const [openSaveActivity, setOpenSaveActivity] = useState<boolean>(false);
  const [openEditNewActivity, setOpenEditNewActivity] =
    useState<boolean>(false);
  const [openDeleteActivity, setOpenDeleteActivity] = useState<boolean>(false);
  const [openDeleteNewActivity, setOpenDeleteNewActivity] =
    useState<boolean>(false);
  const [openEditActivity, setOpenEditActivity] = useState<boolean>(false);
  const [selectedEditedActivity, setSelectedEditedActivity] =
    useState<IActivity>();
  const [selectedNewActivity, setSelectedNewActivity] =
    useState<IActivitySaved>();
  const [selectedActivityIndex, setSelectedActivityIndex] = useState<number>(0);
  const [activitiesDeleteList, setActivitiesDeleteList] = useState<number[]>(
    []
  );
  const [rewardsDeleteList, setRewardsDeleteList] = useState<number[]>([]);
  const {
    clearEditLessonData,
    clearNewLessonData,
    setEditLessonData,
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

  const activitiesListAdd = () => {
    if (selectedEditedActivity && activitiesDeleteList) {
      setActivitiesDeleteList([
        selectedEditedActivity.id,
        ...activitiesDeleteList,
      ]);
    }
  };

  const onSubmit = async (values: FormInput) => {
    try {
      const lesson: ILessonSaved = {
        title: values.title,
        index: 1,
        classroom_id: values.classroom_id,
        teacher_subject_classroom_id: values.teacher_subject_classroom_id,
      };
      const { status } = await editLesson(lesson, selectedLesson.id);

      if (status === 200 && editLessonActivities) {
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
              async (activityId) => await deleteActivity(activityId)
            )
          );
        }
        if (rewardsDeleteList && rewardsDeleteList.length > 0) {
          const deletRewardResponse = await Promise.all(
            rewardsDeleteList.map(
              async (rewardId) => await deleteReward(rewardId)
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
                        <div
                          key={index}
                          className='tw-border tw-bg-gradient-to-r tw-from-blue-600 tw-to-blue-800 tw-rounded-md tw-min-h-40 tw-flex tw-flex-col tw-gap-3 tw-p-4'
                        >
                          <div className='tw-flex tw-justify-between tw-items-center'>
                            <h4 className='tw-text-white tw-font-bold tw-mb-0'>
                              {activity.title}
                            </h4>
                            <div className='tw-flex tw-gap-2'>
                              <Button
                                color='secondary'
                                variant='outlined'
                                startIcon={
                                  <EditIcon className='tw-w-5 tw-h-5' />
                                }
                                onClick={() => {
                                  setSelectedActivityIndex(index);
                                  setSelectedEditedActivity(activity);
                                  setOpenEditActivity(true);
                                }}
                              >
                                Editar
                              </Button>
                              <Button
                                color='secondary'
                                variant='outlined'
                                onClick={() => {
                                  setSelectedActivityIndex(index);
                                  setSelectedEditedActivity(activity);
                                  setOpenDeleteActivity(true);
                                }}
                                startIcon={
                                  <DeleteForeverOutlinedIcon className='tw-w-5 tw-h-5' />
                                }
                              >
                                Eliminar
                              </Button>
                            </div>
                          </div>
                          <h4 className='tw-text-white tw-flex-1 tw-mb-0 tw-flex tw-text-justify'>
                            {activity.description}
                          </h4>
                        </div>
                      );
                    })}
                  {activities &&
                    activities.length > 0 &&
                    activities.map((activity, index) => {
                      return (
                        <div
                          key={index}
                          className='tw-border tw-bg-gradient-to-r tw-from-blue-600 tw-to-blue-800 tw-rounded-md tw-min-h-40 tw-flex tw-flex-col tw-gap-3 tw-p-4'
                        >
                          <div className='tw-flex tw-justify-between tw-items-center'>
                            <h4 className='tw-text-white tw-font-bold tw-mb-0'>
                              {activity.title}
                            </h4>
                            <div className='tw-flex tw-gap-2'>
                              <Button
                                color='secondary'
                                variant='outlined'
                                startIcon={
                                  <EditIcon className='tw-w-5 tw-h-5' />
                                }
                                onClick={() => {
                                  setSelectedActivityIndex(index);
                                  setSelectedNewActivity(activity);
                                  setOpenEditNewActivity(true);
                                }}
                              >
                                Editar
                              </Button>
                              <Button
                                color='secondary'
                                variant='outlined'
                                onClick={() => {
                                  setSelectedActivityIndex(index);
                                  setSelectedNewActivity(activity);
                                  setOpenDeleteNewActivity(true);
                                }}
                                startIcon={
                                  <DeleteForeverOutlinedIcon className='tw-w-5 tw-h-5' />
                                }
                              >
                                Eliminar
                              </Button>
                            </div>
                          </div>
                          <h4 className='tw-text-white tw-flex-1 tw-mb-0 tw-flex tw-text-justify'>
                            {activity.description}
                          </h4>
                        </div>
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
                <div className='tw-flex tw-gap-5 tw-scroll-auto tw-overflow-x-auto tw-justify-center'>
                  {editLessonRewards &&
                    editLessonRewards.length > 0 &&
                    editLessonRewards.map((reward, index) => {
                      return (
                        <RewardCard
                          key={index}
                          reward={{
                            name: reward.title,
                            description: reward.description,
                            numberOfActivities: reward.n_required,
                          }}
                          editEffect={() =>
                            openModal({
                              title: 'Editar recompensa',
                              content: (
                                <EditRewardModal
                                  editedReward={reward}
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
                                  editedReward={true}
                                  index={index}
                                  rewardDeleteListAdd={() => {
                                    setRewardsDeleteList([
                                      ...(rewardsDeleteList || []),
                                      reward.id,
                                    ]);
                                  }}
                                />
                              ),
                              maxWidth: 'sm',
                              withActions: false,
                            });
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
                            name: reward.name,
                            description: reward.description,
                            numberOfActivities: reward.numberOfActivities,
                          }}
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
                                  editedReward={true}
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
                    className={`${
                      rewards.length + editLessonRewards.length > 0
                        ? 'tw-m-0'
                        : 'tw-m-auto'
                    } tw-flex tw-flex-col tw-gap-2 tw-rounded-md tw-items-center tw-justify-center border-dashed tw-max-h-[400px] tw-h-[400px] tw-min-w-[260px] tw-w-[260px] hover:tw-cursor-pointer tw-transition-all tw-duration-200 tw-ease-in-out tw-bg-transparent hover:tw-bg-sky-50`}
                    onClick={() =>
                      openModal({
                        title: 'Ingresar recompensas',
                        content: <CreateRewardModal />,
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
                  disabled={
                    isSubmitting ||
                    !values.title ||
                    !(activities.length + editLessonActivities.length > 0)
                  }
                >
                  Guardar clase
                </Button>
              </div>
            </div>
          </form>
          <ViewSaveActivityDialog
            open={openSaveActivity}
            currentLesson={{
              id: selectedLesson.id,
              title: values.title,
              index: 1,
              classroom_id: values.classroom_id,
            }}
            handleClose={() => {
              setOpenSaveActivity(false);
            }}
          />
          {/* For already saved activities */}
          {openEditActivity && selectedEditedActivity && (
            <ViewEditActivityDialog
              open={openEditActivity}
              index={selectedActivityIndex}
              editedActivity={selectedEditedActivity}
              currentLesson={{
                id: selectedLesson.id,
                title: values.title,
                index: 1,
                classroom_id: values.classroom_id,
              }}
              handleClose={() => {
                setOpenEditActivity(false);
              }}
            />
          )}
          {openDeleteActivity && selectedEditedActivity && (
            <ViewDeleteActivityDialog
              open={openDeleteActivity}
              index={selectedActivityIndex}
              editedActivity={selectedEditedActivity}
              handleClose={() => {
                setOpenDeleteActivity(false);
              }}
              activityDeleteListAdd={activitiesListAdd}
            />
          )}
          {/* For new activities */}
          {openEditNewActivity && selectedNewActivity && (
            <ViewEditActivityDialog
              open={openEditNewActivity}
              index={selectedActivityIndex}
              newActivity={selectedNewActivity}
              currentLesson={{
                id: selectedLesson.id,
                title: values.title,
                index: 1,
                classroom_id: values.classroom_id,
              }}
              handleClose={() => {
                setOpenEditNewActivity(false);
              }}
            />
          )}
          {openDeleteNewActivity && selectedNewActivity && (
            <ViewDeleteActivityDialog
              open={openDeleteNewActivity}
              index={selectedActivityIndex}
              newActivity={selectedNewActivity}
              handleClose={() => {
                setOpenDeleteNewActivity(false);
              }}
            />
          )}
        </>
      )}
    </Formik>
  );
};

export default EditLesson;
