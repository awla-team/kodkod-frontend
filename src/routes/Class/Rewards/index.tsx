import { useEffect, useState } from 'react';
import { RewardsList } from './styled';
import { Button, Typography } from '@mui/material';
import { useParams, useSearchParams } from 'react-router-dom';
import RewardCard from 'components/RewardCard';
import { getRewardsByAdventure, updateReward } from 'api/services/rewards';
import { type IReward, type IUser } from 'global/interfaces';
import Toaster from 'utils/Toster';
import http from 'api/config';
import { AxiosError, AxiosResponse } from 'axios';
import { useClassContext } from '../context';
import ContentBox from 'components/ContentBox';
import { useNavigate } from 'react-router';
import { studentsByClass } from 'api/services/students';
import { useOnboarding } from 'contexts/OnboardingContext';
import RewardsOnboarding from 'utils/Onboardings/RewardsOnboarding';
import { useTour } from '@reactour/tour';

const Rewards = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { classId } = useParams();
  const { classDetails, setClassDetails } = useClassContext();
  const { setNewAvailableTours } = useOnboarding();
  const { setIsOpen, setSteps, setCurrentStep } = useTour();
  const [onboardingDone, setOnboardingDone] = useState(true);
  const [rewards, setRewards] = useState<IReward[]>([]);

  const usedRewardCount = (rewardId: number, classStudents: IUser[]) => {
    let count = 0;
    classStudents.forEach((student) => {
      if (student?.user_has_rewards?.length)
        student.user_has_rewards.forEach((reward) => {
          if (reward?.id_reward === rewardId && reward?.used_at) count++;
        });
    });
    return count;
  };

  const handleEditReward = async (
    rewardId: number | string,
    body: Partial<IReward>
  ) => {
    return await updateReward(rewardId, body)
      .then((response) => {
        const newRewards = [...rewards];
        const updatedReward = response.data;
        const matchReward = newRewards.findIndex(
          (reward) => reward.id === rewardId
        );
        newRewards[matchReward] = updatedReward;
        setRewards(newRewards);
        setClassDetails({
          ...classDetails,
          // FIXME: fix this ts error
          // @ts-expect-error ts-error(2322)
          current_adventure: {
            // FIXME: fix this ts error
            // @ts-expect-error ts-error(18048)
            ...classDetails.current_adventure,
            rewards: newRewards,
          },
        });
        Toaster('success', 'Recompensa actualizada exitosamente');
        return response;
      })
      .catch((error) => {
        console.log(error);
        Toaster('error', 'Hubo un error al cargar las recompensas');
        return error;
      });
  };

  const handleNavigate = () => {
    navigate(`/app/cursos/${classId}/aventuras`);
  };

  useEffect(() => {
    const rawOnboardingData = localStorage.getItem('onboarding-data');
    // FIXME: fix this ts error
    // @ts-expect-error ts-error(2345)
    const onboardingData = JSON.parse(rawOnboardingData);
    setOnboardingDone(!!onboardingData?.recompensas);
  }, []);

  useEffect(() => {
    // FIXME: fix this ts error
    // @ts-expect-error ts-error(2722)
    setNewAvailableTours([
      {
        name: 'Gestión de recompensas',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        steps: RewardsOnboarding,
      },
    ]);
  }, []);

  useEffect(() => {
    if (!onboardingDone) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      setSteps(RewardsOnboarding);
      setCurrentStep(0);
      setIsOpen(true);
    }
  }, [onboardingDone]);

  useEffect(() => {
    const currentAdventureId = classDetails?.current_adventure?.id;
    if (currentAdventureId) {
      // FIXME: fix this eslint error
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      (async () => {
        try {
          // FIXME: fix this eslint error
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          const { data: studentsData } = await studentsByClass(classId, {
            role: 'student',
            rewards: true,
          });
          const rewardsWithUsedCount =
            // FIXME: fix this ts error
            // @ts-expect-error ts-error(18048)
            classDetails.current_adventure.rewards.map((reward) => {
              return {
                ...reward,
                usedCount: usedRewardCount(
                  reward.id,
                  // FIXME: fix this eslint error
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                  studentsData.responseData
                ),
              };
            });
          const sorted = rewardsWithUsedCount.sort((a, b) => {
            if (a.required_points > b.required_points) return 1;
            if (a.required_points < b.required_points) return -1;
            return 0;
          });
          setRewards(sorted);
        } catch (error: unknown) {
          console.error(error);
          Toaster('error', 'Hubo un error al cargar las recompensas');
        }
      })();
    }
  }, [classId, searchParams, classDetails?.current_adventure]);

  if (!classDetails?.current_adventure)
    return (
      <ContentBox className='align-items-center p-5'>
        <Typography
          component='h4'
          variant='h4'
          fontWeight='bold'
          className='mb-2'
        >
          ¡Aún no has seleccionado una aventura!
        </Typography>
        <Typography component='span' variant='body1'>
          Debes seleccionar una aventura para poder ver las recompensas.
        </Typography>
        <div className='mt-4'>
          <Button variant='contained' size='large' onClick={handleNavigate}>
            Selecciona una aventura
          </Button>
        </div>
      </ContentBox>
    );

  return (
    <ContentBox className='p-5'>
      <Typography
        component='h4'
        variant='h4'
        fontWeight='bold'
        className='mb-2'
      >
        Recompensas
      </Typography>
      <Typography component='p' variant='body1' className='mb-2'>
        En esta sección podrás gestionar las recompensas del curso y de tus
        estudiantes. ¡Las recompensas son una herramienta muy útil para mantener
        la motivación a tope!
      </Typography>
      <section>
        <Typography
          component='h5'
          variant='h5'
          fontWeight='bold'
          className='mb-2'
        >
          Recompensas individuales
        </Typography>
        <Typography component='p' variant='body1' className='mb-2'>
          Las recompensas individuales se otorgan a todos los estudiantes
          individualmente cuando alcanzan el puntaje indicado en la recompensa.
          Puedes editarlas haciendo click en <b>“editar”</b>. Puedes marcar los
          estudiantes que ya han utilizado su recompensa haciendo click en la
          tarjeta.
        </Typography>
        <RewardsList id='rewards-list'>
          {rewards.map((reward, index) => {
            return (
              <RewardCard
                id={index}
                onSave={handleEditReward}
                key={`${reward.id}-${reward.title}`}
                rewardId={reward.id}
                title={reward.title}
                description={reward.description}
                icon={reward.icon}
                requiredPoints={reward.required_points}
                type={reward.type}
                order={index + 1}
                usedCount={reward.usedCount}
              />
            );
          })}
        </RewardsList>
      </section>
    </ContentBox>
  );
};

export default Rewards;
