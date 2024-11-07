import { Button, Chip, CircularProgress, Drawer } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import EditIcon from '@mui/icons-material/Edit';
import type ILesson from 'types/models/Lesson';
import { getActivityByLessonId } from 'services/activities';
import type IActivity from 'types/models/Activity';
import { type AxiosResponse } from 'axios';
import { FetchStatus } from 'global/enums';
import LessonRewardCard from 'components/LessonRewardCard';
import { getRewardsByLessonId } from 'services/rewards';
import EditLesson from './EditLesson';
import ActivityStudentsDrawer from 'components/drawers/ActivityStudentsDrawer';
import { getLessonByID } from 'services/lessons';
import { useQuery } from '@tanstack/react-query';
import ActivityCard from 'components/ActivityCard';

const LessonDetails: React.FC = () => {
  const [openEditLesson, setOpenEditLesson] = useState<boolean>(false);
  const [openActivitiesDrawer, setOpenActivitiesDrawer] =
    useState<boolean>(false);
  const [fetching, setFetching] = useState<FetchStatus>(FetchStatus.Idle);
  const [lesson, setLesson] = useState<ILesson>();
  const [selectedActivity, setSelectedActivity] = useState<
    | (IActivity & {
        studentsCompletedActivity: number;
      })
    | null
  >(null);
  const navigate = useNavigate();
  const { lessonId } = useParams() as { lessonId: string };

  const getLessonData = () => {
    try {
      if (lessonId) {
        getLessonByID(lessonId)
          .then((response: AxiosResponse) => {
            return response?.data;
          })
          .then(
            (
              lesson: ILesson & {
                studentsCompletedActivities: number;
              }
            ) => {
              setLesson(lesson);
            }
          )
          .catch((error) => {
            setFetching(FetchStatus.Error);
            console.error(error);
          });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const {
    data: activitiesResponse,
    isPending: isPendingActivities,
    refetch: reloadActivities,
  } = useQuery({
    queryKey: ['activities', lessonId],
    queryFn: async () => await getActivityByLessonId(lessonId),
    enabled: !!lessonId,
  });

  const {
    data: rewardsResponse,
    isPending: isPendingRewards,
    refetch: reloadRewards,
  } = useQuery({
    queryKey: ['rewards', lessonId],
    queryFn: async () => await getRewardsByLessonId(lessonId),
    enabled: !!lessonId,
  });

  const loadData = () => {
    setFetching(FetchStatus.Pending);
    getLessonData();
  };

  useEffect(() => {
    loadData();
  }, [lessonId]);

  const goBack = () => {
    navigate(-1);
  };

  const handleEditLesson = () => {
    setOpenEditLesson(true);
  };
  const toggleActivitiesDrawer = (value: boolean) => () => {
    setOpenActivitiesDrawer(value);
  };

  const openActivityDrawer = (
    activity: IActivity & {
      studentsCompletedActivity: number;
    }
  ) => {
    setSelectedActivity(activity);
    setOpenActivitiesDrawer(true);
  };

  const closeActivityDrawer = () => {
    setOpenActivitiesDrawer(false);
  };

  if (isPendingActivities || isPendingRewards)
    return (
      <div className='app-container d-flex justify-content-center align-items-center'>
        <CircularProgress />
      </div>
    );

  if (!activitiesResponse || !rewardsResponse)
    return (
      <div>
        <h5>No hay actividades disponibles para esta clase</h5>
      </div>
    );

  const { data: activities } = activitiesResponse;
  const { data: rewards } = rewardsResponse;

  if (openEditLesson && lesson) {
    return (
      <EditLesson
        handleClose={async () => {
          setOpenEditLesson(false);
          loadData();
          await reloadActivities();
          await reloadRewards();
        }}
        lessonActivities={activities}
        lessonRewards={rewards}
        selectedLesson={lesson}
      />
    );
  }

  return (
    <div>
      <div className='tw-flex tw-justify-between tw-mb-4'>
        <Button
          variant='text'
          size='large'
          startIcon={<ChevronLeftIcon />}
          onClick={goBack}
        >
          Volver a lista de clases
        </Button>
        {lesson?.ended_at ? null : (
          <Button
            variant='outlined'
            size='large'
            startIcon={<EditIcon />}
            onClick={handleEditLesson}
          >
            Editar Clase
          </Button>
        )}
      </div>
      <div className='tw-flex tw-items-center tw-gap-2'>
        <h4 className='tw-flex tw-m-0'>
          Clase: <b className='tw-ml-2'>{lesson?.title}</b>
        </h4>
        {lesson?.ended_at && (
          <Chip
            className='tw-ml-2'
            label='Clase finalizada'
            color='success'
            size='medium'
          />
        )}
      </div>
      <div className='tw-flex tw-flex-col tw-gap-4'>
        <span className='tw-block tw-mt-8'>
          Tus estudiantes deben completar las siguientes actividades
        </span>
        <div className='tw-flex tw-flex-col tw-gap-2 tw-scroll-auto tw-overflow-y-auto'>
          {activities.length > 0 ? (
            activities.map((activity, index) => {
              return <ActivityCard key={index} activity={activity} />;
            })
          ) : (
            <h5 className='tw-flex tw-justify-center tw-m-4 tw-font-semibold'>
              No hay actividades disponibles para esta clase
            </h5>
          )}
        </div>
      </div>
      {/* selectedActivity && openActivitiesDrawer && (
        <div
          className='tw-fixed tw-top-1/3 tw-right-1/3 tw-w-[640px] tw-z-[9999] tw-border tw-bg-gradient-to-r tw-from-blue-600 tw-to-blue-800 tw-rounded-md tw-min-h-40 tw-flex tw-flex-col tw-gap-3 tw-p-4'
        >
          <div className='tw-flex tw-justify-between tw-items-center'>
            <h4 className='tw-text-white tw-font-bold tw-mb-0'>
              {selectedActivity.title}
            </h4>
          </div>
          <h4 className='tw-text-white tw-flex-1 tw-mb-0 tw-flex tw-text-justify'>
            {selectedActivity.description}
          </h4>
        </div>
      ) */}
      <Drawer
        open={openActivitiesDrawer}
        onClose={toggleActivitiesDrawer(false)}
        anchor='right'
        style={{ zIndex: 1000 }}
      >
        {selectedActivity && (
          <ActivityStudentsDrawer
            activity={selectedActivity}
            closeDrawer={closeActivityDrawer}
            lesson={lesson}
            reloadActivities={reloadActivities}
          />
        )}
      </Drawer>

      <div className='tw-flex tw-flex-col tw-gap-4'>
        <span className='tw-block tw-mt-8'>
          Al completar actividades, pueden obtener las siguientes recompensas
        </span>
        <div
          className={`tw-flex tw-gap-5 tw-scroll-auto tw-overflow-x-auto ${
            rewards.length > 0 ? '' : 'tw-justify-center'
          }`}
        >
          {rewards.length > 0 ? (
            rewards.map((reward, index) => {
              return (
                <div key={index}>
                  <LessonRewardCard reward={reward} />
                </div>
              );
            })
          ) : (
            <h5 className='tw-flex tw-justify-center tw-m-4 tw-font-semibold'>
              No hay recompensas disponibles para esta clase
            </h5>
          )}
        </div>
      </div>
      <span className='tw-block tw-my-8'>
        El profesor escogerá el momento de la clase para hacer uso de las
        recompensas. ¡Buena suerte!
      </span>
      <Button
        variant='contained'
        color='primary'
        size='large'
        fullWidth
        onClick={() => navigate(`../${lessonId}/review`)}
      >
        Mostrar recompensas obtenidas
      </Button>
    </div>
  );
};

export default LessonDetails;
