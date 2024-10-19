import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import EditIcon from '@mui/icons-material/Edit';
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
import PostcardIcon from 'assets/images/postcard-heart.svg';
import BookmarkStarIcon from 'assets/images/bookmark-star.svg';
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
                  {activities?.map((activity, index) => {
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
                              startIcon={<EditIcon className='tw-w-5 tw-h-5' />}
                              onClick={() => {
                                setSelectedActivityIndex(index);
                                setSelectedActivity(activity);
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
                                setSelectedActivity(activity);
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
                    className={`${
                      rewards.length ? 'tw-m-0' : 'tw-m-auto'
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
                  disabled={isSubmitting || !values.title || !activities.length}
                >
                  Guardar clase
                </Button>
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
            newActivity={selectedActivity}
            handleClose={() => {
              setOpenDeleteActivity(false);
            }}
          />
        </>
      )}
    </Formik>
  );
};

export default SaveLesson;
