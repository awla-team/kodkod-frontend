import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import postCard from 'assets/images/postcard-heart 1.png';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import EditNoteIcon from '@mui/icons-material/EditNote';
import type ILesson from 'types/models/Lesson';
import { type ILessonSaved } from 'types/models/Lesson';
import { Formik } from 'formik';
import { editLesson } from 'services/lessons';
import Toaster from 'utils/Toster';
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
import type IActivity from 'types/models/Activity';
import type IReward from 'types/models/Reward';
import DeleteRewardModalDialog from 'components/Modals/DeleteRewardModal';
import { type IActivitySaved } from 'types/models/Activity';
import ViewDeleteActivityDialog from 'components/Modals/DeleteActivity';
import ActivityForm from 'components/ActivityForm';

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
                <Link
                  className='fw-bold tw-flex tw-text-primary-500'
                  onClick={goBack}
                >
                  <h5>
                    <b>{'< Volver a la clase'}</b>
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
                  {editLessonActivities && editLessonActivities.length > 0 ? (
                    editLessonActivities.map((activity, index) => {
                      return (
                        <div
                          key={index}
                          className='tw-border tw-bg-gradient-to-r tw-from-blue-600 tw-to-cyan-500 tw-rounded-md tw-min-h-40 tw-flex tw-flex-col tw-my-4'
                        >
                          <div className='tw-flex tw-mx-8 tw-mt-8 tw-w-24'>
                            <h5
                              className='tw-flex tw-mr-4 tw-justify-center tw-text-white tw-border tw-border-none hover:tw-cursor-pointer tw-ease-in-out hover:tw-bg-indigo-300 hover:tw-border tw-rounded tw-transition-all tw-duration-200'
                              onClick={async () => {
                                setSelectedActivityIndex(index);
                                setSelectedEditedActivity(activity);
                                setOpenEditActivity(true);
                              }}
                            >
                              <EditNoteIcon />
                              Editar
                            </h5>

                            <h5
                              onClick={() => {
                                setSelectedActivityIndex(index);
                                setSelectedEditedActivity(activity);
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
                    <div className='tw-border tw-border-dashed tw-rounded-md tw-h-40 tw-flex tw-justify-between tw-items-center hover:tw-cursor-pointer tw-transition-all tw-duration-200 tw-ease-in-out tw-bg-transparent hover:tw-bg-indigo-100'>
                      <h5 className='tw-flex tw-justify-center tw-m-4 tw-font-semibold'>
                        No hay actividades disponibles para esta clase
                      </h5>
                    </div>
                  )}
                  {activities &&
                    activities.length > 0 &&
                    activities.map((activity, index) => {
                      return (
                        <div
                          key={index}
                          className='tw-border tw-bg-gradient-to-r tw-from-blue-600 tw-to-cyan-500 tw-rounded-md tw-h-40 tw-flex tw-flex-col tw-my-4'
                        >
                          <div className='tw-flex tw-mx-8 tw-mt-8 tw-w-24'>
                            <h5
                              className='tw-flex tw-mr-4 tw-justify-center tw-text-white tw-border tw-border-none hover:tw-cursor-pointer tw-ease-in-out hover:tw-bg-indigo-300 hover:tw-border tw-rounded tw-transition-all tw-duration-200'
                              onClick={async () => {
                                setSelectedActivityIndex(index);
                                setSelectedNewActivity(activity);
                                setOpenEditNewActivity(true);
                              }}
                            >
                              <EditNoteIcon />
                              Editar
                            </h5>

                            <h5
                              onClick={() => {
                                setSelectedActivityIndex(index);
                                setSelectedNewActivity(activity);
                                setOpenDeleteNewActivity(true);
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
                    })}
                  <div className='tw-border tw-border-dashed tw-rounded-md tw-h-40 tw-flex tw-justify-between tw-items-center hover:tw-cursor-pointer tw-transition-all tw-duration-200 tw-ease-in-out tw-bg-transparent hover:tw-bg-indigo-100'>
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
                <div className='tw-flex tw-gap-5 tw-scroll-auto tw-overflow-x-auto tw-p-3'>
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
                    className='tw-min-w-72 tw-border tw-text-center tw-border-dashed tw-rounded-md tw-flex tw-justify-center tw-items-center tw-flex-col hover:tw-cursor-pointer tw-transition-all tw-duration-200 tw-ease-in-out tw-bg-transparent hover:tw-bg-indigo-100'
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
                    className='tw-bg-primary-500'
                    disabled={isSubmitting}
                  >
                    Guardar Clase
                  </button>
                </div>
              </div>
            </form>
            <ActivityForm
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
              <ActivityForm
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
              <ActivityForm
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
    </div>
  );
};

export default EditLesson;
