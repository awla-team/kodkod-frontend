import { useEffect, useState } from 'react';
import { ChevronLeft } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import LessonRewardCard from 'components/LessonRewardCard';
import { stringAvatar } from 'utils/methods';
import type IStudent from 'types/models/Student';
import { useMutation } from '@tanstack/react-query';
import {
  getRewardsByLessonId,
  getStudentsCompletedReward,
} from 'services/rewards';
import type IReward from 'types/models/Reward';
import { Avatar } from '@mui/material';

const LessonReview = () => {
  const navigate = useNavigate();
  const { lessonId } = useParams();
  const [selectedRewardId, setSelectedRewardId] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [rewards, setRewards] = useState<IReward[]>([]);
  const [completedRewardStudents, setCompletedRewardStudents] = useState<
    IStudent[]
  >([]);
  const { mutate: mutateGetRewardsByLessonId, isPending } = useMutation({
    mutationFn: async () => await getRewardsByLessonId(Number(lessonId)),
    onSuccess: (response) => {
      if (response) {
        setRewards(response.data);
      }
    },
  });
  const { mutate: mutateGetStudentsCompletedReward } = useMutation({
    mutationFn: async (id: number) => await getStudentsCompletedReward(id),
    onSuccess: (response) => {
      if (response) {
        setCompletedRewardStudents(response.data);
      }
    },
  });

  useEffect(() => {
    mutateGetRewardsByLessonId();
  }, [mutateGetRewardsByLessonId]);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className='tw-flex tw-flex-col tw-gap-6'>
      <div className='tw-flex tw-flex-col'>
        <button
          type='button'
          className='tw-flex tw-items-center tw-font-semibold tw-bg-transparent tw-text-primary tw-border-none hover:tw-underline tw-text-lg tw-px-0'
          onClick={goBack}
        >
          <ChevronLeft />
          Volver a la clase
        </button>

        <h3 className='tw-flex tw-gap-4'>
          Clase:
          <span className='tw-font-bold'>{'hola'}</span>
        </h3>
      </div>

      <h2 className='tw-text-center tw-text-primary tw-font-extrabold tw-text-6xl'>
        BUEN TRABAJO!
      </h2>

      <div>
        {isPending ? (
          <p>cargando...</p>
        ) : (
          <>
            <p>
              Haz click en alguna recompensa para mostrar los estudiantes que la
              obtuvieron
            </p>
            <div className='tw-flex tw-justify-center tw-flex-wrap tw-gap-3'>
              {rewards.map((reward, index) => (
                <div
                  key={reward.id}
                  className='tw-w-64 tw-rounded-lg tw-transition-all tw-duration-200 tw-ease-in-out hover:tw-shadow'
                  style={{
                    cursor: 'pointer',
                    border:
                      selectedRewardId === reward.id
                        ? '2px solid #3B82F6'
                        : '2px solid transparent',
                  }}
                  onClick={() => {
                    setSelectedRewardId(reward.id);
                    mutateGetStudentsCompletedReward(reward.id);
                  }}
                >
                  <LessonRewardCard reward={reward} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <div>
        <p>
          {selectedRewardId === 0
            ? 'Seleccione una recompensa para ver los estudiantes que la completaron'
            : completedRewardStudents.length === 0
              ? 'La recompensa no tiene estudiantes que la obtuvieran'
              : 'Esta recompensa ha sido obtenida por los siguientes estudiantes'}
        </p>

        <div className='tw-grid tw-grid-cols-3 tw-gap-4'>
          {completedRewardStudents.map((student, index) => (
            <div key={index} className='tw-flex tw-items-center tw-gap-2'>
              <Avatar
                {...stringAvatar(`${student.first_name} ${student.last_name}`)}
                sx={{
                  background: '#646cff',
                  fontSize: '1rem',
                }}
              />
              <h5 className='tw-text-sm tw-font-semibold tw-m-0'>
                {student.first_name} {student.last_name}
              </h5>
            </div>
          ))}
        </div>
      </div>

      <button type='button' className='tw-bg-primary'>
        Finalizar clase
      </button>
    </div>
  );
};

export default LessonReview;
