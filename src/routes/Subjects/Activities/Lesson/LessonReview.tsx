/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react';
import { ChevronLeft } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { stringAvatar } from 'utils/methods';
import type IStudent from 'types/models/Student';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  getRewardsByLessonId,
  getStudentsCompletedReward,
} from 'services/rewards';
import type IReward from 'types/models/Reward';
import { Avatar, Button, Chip, CircularProgress } from '@mui/material';
import { finishLesson, getLessonByID } from 'services/lessons';
import Toaster from 'utils/Toster';
import RewardCard from 'components/RewardCard';

const LessonReview = () => {
  const navigate = useNavigate();
  const { classId: t_classroom_id, lessonId } = useParams() as {
    classId: string;
    lessonId: string;
  };
  const [selectedRewardId, setSelectedRewardId] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [rewards, setRewards] = useState<IReward[]>([]);
  const [completedRewardStudents, setCompletedRewardStudents] = useState<
    IStudent[]
  >([]);
  const {
    data,
    isPending: isLoadingLesson,
    error,
  } = useQuery({
    queryKey: ['lesson', lessonId],
    queryFn: async () => await getLessonByID(Number(lessonId)),
  });
  const { mutate: mutateGetRewardsByLessonId, isPending } = useMutation({
    mutationFn: async () => await getRewardsByLessonId(lessonId),
    onSuccess: (response) => {
      if (response) {
        setRewards(response.data);
      }
    },
  });
  const {
    mutate: mutateGetStudentsCompletedReward,
    isPending: isPendingStudentsCompletedReward,
  } = useMutation({
    mutationFn: async (id: number) =>
      await getStudentsCompletedReward(id, {
        t_classroom_id: Number(t_classroom_id),
      }),
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

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const { status } = await finishLesson(Number(lessonId), {
        ended_at: new Date().toISOString(),
      });
      if (status === 200) {
        Toaster('success', 'Clase finalizada con éxito');
        navigate(`/app/classroom/${t_classroom_id}/lessons`);
      }
    } catch (e) {
      Toaster('error', 'Error al finalizar la clase');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingLesson) {
    return (
      <div className='tw-flex tw-justify-center'>
        <CircularProgress color='primary' size='2rem' />
      </div>
    );
  }

  if (!data || error) return <div>La clase no existe</div>;

  const { data: lesson } = data;

  return (
    <div className='tw-flex tw-flex-col tw-gap-6'>
      <div className='tw-flex tw-flex-col'>
        <div className='tw-flex tw-justify-between tw-mb-4'>
          <Button
            variant='text'
            size='large'
            startIcon={<ChevronLeft />}
            onClick={goBack}
          >
            Volver a la clase en curso
          </Button>
        </div>

        <div className='tw-flex tw-items-center tw-gap-2'>
          <h4 className='tw-flex tw-m-0'>
            Clase: <b className='tw-ml-2'>{lesson?.title}</b>
          </h4>
          {lesson.ended_at && (
            <Chip
              className='tw-ml-2'
              label='Clase finalizada'
              color='success'
              size='medium'
            />
          )}
        </div>
      </div>

      <h2 className='tw-text-center tw-text-primary-500 tw-font-extrabold tw-text-7xl tw-py-10'>
        ¡BUEN TRABAJO!
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
              {rewards.map((reward) => (
                <div
                  key={reward.id}
                  className='tw-rounded-lg tw-transition-all tw-duration-200 tw-ease-in-out tw-cursor-pointer'
                  style={{
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
                  <RewardCard reward={reward} />
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

        {isPendingStudentsCompletedReward ? (
          <div className='tw-flex tw-justify-center tw-w-full'>
            <CircularProgress color='primary' size='2rem' />
          </div>
        ) : (
          <div className='tw-grid tw-grid-cols-3 tw-gap-4'>
            {completedRewardStudents.map((student, index) => (
              <div key={index} className='tw-flex tw-items-center tw-gap-2'>
                <Avatar
                  {...stringAvatar(
                    `${student.first_name} ${student.last_name}`
                  )}
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
        )}
      </div>

      <Button
        variant='contained'
        color='primary'
        size='large'
        fullWidth
        onClick={onSubmit}
        disabled={isLoading || lesson.ended_at !== null}
      >
        {isLoading ? (
          <CircularProgress color='info' size='1rem' />
        ) : lesson.ended_at ? (
          'Clase finalizada'
        ) : (
          'Finalizar clase'
        )}
      </Button>
    </div>
  );
};

export default LessonReview;
