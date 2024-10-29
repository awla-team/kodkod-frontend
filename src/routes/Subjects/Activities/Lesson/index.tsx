import { CircularProgress, Drawer } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import EditNoteIcon from '@mui/icons-material/EditNote';
import type ILesson from 'types/models/Lesson';
import { getActivityByLessonId } from 'services/activities';
import type IActivity from 'types/models/Activity';
import { type AxiosResponse } from 'axios';
import { FetchStatus } from 'global/enums';
import LessonRewardCard from 'components/LessonRewardCard';
import type IReward from 'types/models/Reward';
import { getRewardsByLessonId } from 'services/rewards';
import EditLesson from './EditLesson';
import ActivityStudentsDrawer from 'components/drawers/ActivityStudentsDrawer';
import { useModalStore } from 'contexts/ZustandContext/modal-context';
import { getLessonByID } from 'services/lessons';
import { useQuery } from '@tanstack/react-query';
import RewardCard from 'components/RewardCard';

const LessonDetails: React.FC = () => {
  const { openModal } = useModalStore();
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
    <div className='tw-space-y-6'>
      <div className='tw-flex tw-justify-between'>
        <button
          type='button'
          className='tw-flex tw-bg-transparent tw-text-primary-500 tw-border-none hover:tw-underline'
          onClick={goBack}
        >
          <h5 className='tw-font-semibold tw-text-primary-500'>
            {'< Volver a mis clases'}
          </h5>
        </button>
        {lesson?.ended_at ? (
          <> </>
        ) : (
          <button
            type='button'
            className='tw-flex tw-bg-transparent tw-text-primary-500 tw-border-none'
            onClick={handleEditLesson}
          >
            <h5 className='tw-font-semibold'>
              <EditNoteIcon /> {' Editar clase'}
            </h5>
          </button>
        )}
      </div>

      <h2 className='tw-flex'>
        Clase:
        <b className='tw-flex tw-ml-2'>{'' + lesson?.title || '?'}</b>
      </h2>

      <h4 className='tw-flex tw-my-4'>
        L@s estudiantes deben completar las siguientes actividades
      </h4>
      {activities.length > 0 ? (
        activities.map((activity, index) => {
          return (
            <div
              key={index}
              className='tw-border tw-bg-gradient-to-r tw-from-blue-600 tw-to-cyan-500 tw-rounded-md tw-min-h-40 tw-flex tw-justify-between tw-items-center hover:tw-cursor-pointer'
              onClick={() => openActivityDrawer(activity)}
            >
              <div className='tw-flex tw-flex-row tw-justify-between tw-w-full tw-h-full'>
                <div className='tw-ml-8' />
                <div className='tw-flex tw-flex-col tw-justify-center tw-items-center'>
                  <h3 className='tw-font-bold tw-text-white'>
                    {activity.title}
                  </h3>
                  <h5 className='tw-font-bold tw-text-white'>
                    {activity.description}
                  </h5>
                </div>
                <h5 className='tw-text-white tw-m-8 tw-font-bold'>
                  <EmojiPeopleIcon /> {activity.studentsCompletedActivity}
                </h5>
              </div>
            </div>
          );
        })
      ) : (
        <div>
          <h5 className='tw-flex tw-justify-center tw-m-4 tw-font-semibold'>
            No hay actividades disponibles para esta clase
          </h5>
        </div>
      )}
      {selectedActivity && openActivitiesDrawer && (
        <div className='tw-fixed tw-top-1/3 tw-right-1/3 w-full tw-bg-gradient-to-r tw-from-blue-600 tw-to-cyan-500 p-4 tw-rounded-md tw-z-[9999]'>
          <div className='tw-relative tw-w-[640px]'>
            <h3 className='tw-font-bold tw-text-white'>
              {selectedActivity.title}
            </h3>
            <h5 className='tw-font-bold tw-text-white tw-break-all tw-mb-4'>
              {selectedActivity.description}
            </h5>
            <div className='tw-absolute tw-top-0 tw-right-0'>
              <h5 className='tw-text-white tw-font-bold tw-m-0 tw-text-sm'>
                <EmojiPeopleIcon /> {selectedActivity.studentsCompletedActivity}
              </h5>
            </div>
          </div>
        </div>
      )}
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

      <h4 className='tw-flex tw-my-4'>
        Al completar actividades, pueden obtener las siguientes recompensas
      </h4>
      <div className='tw-flex tw-gap-5 tw-scroll-auto tw-overflow-x-auto tw-p-3 tw-flex-nowrap'>
        {rewards.length > 0 ? (
          rewards.map((reward, index) => {
            return (
              <div key={index} className='tw-w-72 tw-min-w-72'>
                <RewardCard reward={reward} />
              </div>
            );
          })
        ) : (
          <h5 className='tw-flex tw-justify-center tw-m-4 tw-font-semibold'>
            No hay recompensas disponibles para esta clase
          </h5>
        )}
      </div>
      <h5 className='tw-flex tw-my-4'>
        El profesor escogerá el momento de la clase para hacer uso de las
        recompensas. ¡Buena suerte!
      </h5>
      <div>
        <button
          type='button'
          className='tw-bg-blue-800 tw-w-full'
          onClick={() => navigate(`../${lessonId}/review`)}
        >
          <h5 className='tw-font-bold'> Mostrar recompensas obtenidas</h5>
        </button>
      </div>
    </div>
  );
};

export default LessonDetails;
