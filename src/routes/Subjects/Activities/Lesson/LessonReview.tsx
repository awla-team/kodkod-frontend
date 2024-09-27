import { useEffect, useState } from 'react';
import { ChevronLeft } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import LessonRewardCard from 'components/LessonRewardCard';
import { cn } from 'utils/methods';
import type IStudent from 'types/models/Student';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getRewardsByLessonId } from 'services/rewards';
import type IReward from 'types/models/Reward';

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

  useEffect(() => {
    mutateGetRewardsByLessonId();
  }, [mutateGetRewardsByLessonId]);

  const goBack = () => {
    navigate(-1);
  };

  const getStudentsCompletedReward = (rewardId: number) => {
    try {
      setIsLoading(true);
      setSelectedRewardId(rewardId);

      // TODO: Fetch students that completed the reward
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
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
                      selectedRewardId === index + 1
                        ? '2px solid #3B82F6'
                        : '2px solid transparent',
                  }}
                  onClick={() => getStudentsCompletedReward(index + 1)}
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
            : 'Esta recompensa ha sido obtenida por los siguientes estudiantes'}
        </p>

        <div>
          {completedRewardStudents.map((student, index) => (
            <div
              key={index}
              className={cn(
                'tw-flex tw-justify-between tw-items-center tw-p-4 tw-mb-4 tw-rounded-md tw-shadow-md',
                index % 2 === 0 ? 'tw-bg-gray-100' : 'tw-bg-gray-200'
              )}
            >
              <div className='tw-flex tw-items-center'>
                <img
                  src='https://randomuser.me/api/portraits'
                  alt='student'
                  className='tw-w-12 tw-h-12 tw-rounded-full tw-mr-4'
                />
                <h5 className='tw-text-lg tw-font-semibold'>
                  {student.first_name} {student.last_name}
                </h5>
              </div>
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
