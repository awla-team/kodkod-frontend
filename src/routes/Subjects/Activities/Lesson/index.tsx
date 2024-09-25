import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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

const LessonDetails: React.FC<{
  selectedLesson: ILesson;
  handleClose: () => void;
}> = ({ selectedLesson, handleClose }) => {
  const [fetching, setFetching] = useState<FetchStatus>(FetchStatus.Idle);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [rewards, setRewards] = useState<IReward[]>([]);

  const getLessonData = () => {
    try {
      if (selectedLesson?.id) {
        getActivityByLessonId(selectedLesson.id)
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
      if (selectedLesson?.id) {
        getRewardsByLessonId(selectedLesson.id)
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

  useEffect(() => {
    setFetching(FetchStatus.Pending);
    getRewardsData();
    getLessonData();
  }, [selectedLesson]);

  const goBack = () => {
    handleClose();
  };

  if (fetching === FetchStatus.Idle || fetching === FetchStatus.Pending)
    return (
      <div className='app-container d-flex justify-content-center align-items-center'>
        <CircularProgress />
      </div>
    );

  return (
    <div className='tw-space-y-6'>
      <div className='tw-flex tw-justify-between'>
        <button
          type='button'
          className='tw-flex tw-bg-transparent tw-text-primary tw-border-none hover:tw-underline'
          onClick={goBack}
        >
          <h5 className='tw-font-semibold'>{'< Volver a mis clases'}</h5>
        </button>
        <button
          type='button'
          className='tw-flex tw-bg-transparent tw-text-primary tw-border-none'
          onClick={goBack}
        >
          <h5 className='tw-font-semibold'>
            <EditNoteIcon /> {' Editar clase'}
          </h5>
        </button>
      </div>

      <h2 className='tw-flex tw-gap-4'>
        Clase:
        <h2 className='tw-font-bold'>{selectedLesson.title}</h2>
      </h2>

      <h4 className='tw-flex tw-my-4'>
        L@s estudiantes deben completar las siguientes actividades
      </h4>
      {activities.length > 0 ? (
        activities.map((activity, index) => {
          return (
            <div
              key={index}
              className='tw-border tw-bg-gradient-to-r tw-from-blue-600 tw-to-cyan-500 tw-rounded-md tw-h-40 tw-flex tw-justify-between tw-items-center'
            >
              <div className='tw-flex tw-flex-row tw-justify-between tw-w-full tw-h-full'>
                <div className='tw-ml-8' />
                <div className='tw-flex tw-flex-col tw-justify-center tw-items-center'>
                  <h5 className='tw-font-bold tw-text-white'>
                    {activity.description}
                  </h5>
                </div>
                <h5 className='tw-text-white tw-m-8 tw-font-bold'>
                  <EmojiPeopleIcon /> 0
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
      <h4 className='tw-flex tw-my-4'>
        Al completar actividades, pueden obtener las siguientes recompensas
      </h4>
      <div className='tw-flex tw-justify-center tw-flex-cols-3'>
        {rewards.length > 0 ? (
          rewards.map((reward, index) => {
            return (
              <div key={index}>
                <LessonRewardCard reward={reward} />
              </div>
            );
          })
        ) : (
          <div>
            <h5 className='tw-flex tw-justify-center tw-m-4 tw-font-semibold'>
              No hay recompensas disponibles para esta clase
            </h5>
          </div>
        )}
      </div>
      <h5 className='tw-flex tw-my-4'>
        El profesor escogerá el momento de la clase para hacer uso de las
        recompensas. ¡Buena suerte!
      </h5>
      <div>
        <button
          type='button'
          className='tw-bg-blue-800 tw-w-full tw-font-bold'
          onClick={() => navigate(`${pathname}/2/review`)}
        >
          Mostrar recompensas obtenidas
        </button>
      </div>
    </div>
  );
};

export default LessonDetails;
