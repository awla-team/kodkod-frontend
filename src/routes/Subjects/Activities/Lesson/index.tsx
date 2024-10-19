import { Button, CircularProgress, Drawer } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import EditIcon from '@mui/icons-material/Edit';
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

const LessonDetails: React.FC = () => {
  const { openModal } = useModalStore();
  const [openEditLesson, setOpenEditLesson] = useState<boolean>(false);
  const [openActivitiesDrawer, setOpenActivitiesDrawer] =
    useState<boolean>(false);
  const [fetching, setFetching] = useState<FetchStatus>(FetchStatus.Idle);
  const [lesson, setLesson] = useState<ILesson>();
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [rewards, setRewards] = useState<IReward[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );
  const navigate = useNavigate();
  const { lessonId } = useParams();

  const getLessonData = () => {
    try {
      if (lessonId) {
        getLessonByID(lessonId as number)
          .then((response: AxiosResponse) => {
            return response?.data;
          })
          .then((lesson: ILesson) => {
            setLesson(lesson);
          })
          .catch((error) => {
            setFetching(FetchStatus.Error);
            console.error(error);
          });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getActivitiesData = () => {
    try {
      if (lessonId) {
        getActivityByLessonId(lessonId as number)
          .then((response: AxiosResponse) => {
            return response?.data;
          })
          .then((activityList: IActivity[]) => {
            setActivities(activityList);
            setFetching(FetchStatus.Success);
          })
          .catch((error) => {
            setFetching(FetchStatus.Error);
            console.error(error);
          });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getRewardsData = () => {
    try {
      if (lessonId) {
        getRewardsByLessonId(lessonId as number)
          .then((response: AxiosResponse) => {
            return response?.data;
          })
          .then((rewardList: IReward[]) => {
            setRewards(rewardList);
          })
          .catch((error) => {
            setFetching(FetchStatus.Error);
            console.error(error);
          });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const loadData = () => {
    setFetching(FetchStatus.Pending);
    getLessonData();
    getRewardsData();
    getActivitiesData();
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

  const openActivityDrawer = (activity: IActivity) => {
    setSelectedActivity(activity);
    setOpenActivitiesDrawer(true);
  };

  const closeActivityDrawer = () => {
    setOpenActivitiesDrawer(false);
  };

  if (fetching === FetchStatus.Idle || fetching === FetchStatus.Pending)
    return (
      <div className='app-container d-flex justify-content-center align-items-center'>
        <CircularProgress />
      </div>
    );

  if (openEditLesson && lesson) {
    return (
      <EditLesson
        handleClose={() => {
          setOpenEditLesson(false);
          loadData();
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
        {lesson?.ended_at ? (
          null
        ) : (
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
      <h4 className='tw-flex'>
        Clase: <b className='tw-ml-2'>{lesson?.title}</b>
      </h4>
      <div className='tw-flex tw-flex-col tw-gap-4'>
        <span className='tw-block tw-mt-8'>
          Tus estudiantes deben completar las siguientes actividades
        </span>
        <div className='tw-flex tw-flex-col tw-gap-2 tw-scroll-auto tw-overflow-y-auto'>
          {activities.length > 0 && activities.map((activity, index) => {
              return (
                <div
                  key={index}
                  onClick={() => openActivityDrawer(activity)}
                  className='tw-cursor-pointer tw-border tw-bg-gradient-to-r tw-from-blue-600 tw-to-blue-800 tw-rounded-md tw-min-h-40 tw-flex tw-flex-col tw-gap-3 tw-p-4'
                >
                  <div className='tw-flex tw-justify-between tw-items-center'>
                    <h4 className='tw-text-white tw-font-bold tw-mb-0'>
                      {activity.title}
                    </h4>
                  </div>
                  <h4 className='tw-text-white tw-flex-1 tw-mb-0 tw-flex tw-text-justify'>
                    {activity.description}
                  </h4>
                </div>
              );
            })
          }
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
          />
        )}
      </Drawer>

      <div className='tw-flex tw-flex-col tw-gap-4'>
        <span className='tw-block tw-mt-8'>
          Al completar actividades, pueden obtener las siguientes recompensas
        </span>
        <div className='tw-flex tw-gap-5 tw-scroll-auto tw-overflow-x-auto tw-justify-center'>
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
