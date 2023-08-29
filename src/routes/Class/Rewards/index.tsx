import { useEffect, useRef, useState } from 'react';
import { RewardsList } from './styled';
import { Button, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import RewardCard from 'components/RewardCard';
import { useSearchParams } from 'react-router-dom';
import { getRewardsByAdventure } from 'services/rewards';
import { IReward, IUser } from 'global/interfaces';
import Toaster from 'utils/Toster';
import http from 'global/api';
import { AxiosError, AxiosResponse } from 'axios';
import { useClassContext } from '../context';
import ContentBox from 'components/ContentBox';
import { useNavigate } from 'react-router';
import { studentsByClass } from 'services/students';
import { useOnboarding } from 'contexts/OnboardingContext';
import RewardsOnboarding from 'utils/Onboardings/RewardsOnboarding';

const Rewards = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { classId } = useParams();
  const { classDetails } = useClassContext();
  const { setNewAvailableTours } = useOnboarding();
  const [rewards, setRewards] = useState<(IReward & { usedCount?: number })[]>(
    []
  );

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

  const editReward = (
    rewardId: number | string,
    newTitle: string,
    newDescription: string
  ) => {
    return http
      .put(`reward/${rewardId}`, {
        title: newTitle,
        description: newDescription,
      })
      .then((response: AxiosResponse) => {
        const newRewards = [...rewards];
        const matchReward = newRewards.findIndex(
          (reward) => reward.id === rewardId
        );
        newRewards[matchReward] = {
          ...newRewards[matchReward],
          title: newTitle,
          description: newDescription,
        };
        setRewards(newRewards);
        Toaster('success', 'Recompensa actualizada exitosamente');
        return response;
      })
      .catch(
        (
          error: AxiosError & {
            response: {
              data: { responseData: unknown };
            };
          }
        ) => {
          console.log(error);
          if (error?.response?.data?.responseData === 'Empty data')
            Toaster('error', 'Todos los campos deben ser llenados');
          else Toaster('error', 'Hubo un error al cargar las recompensas');
          return error;
        }
      );
  };

  const handleNavigate = () => {
    navigate(`/app/cursos/${classId}/aventuras`);
  };

  useEffect(() => {
    setNewAvailableTours([
      {
        name: 'Gestión de recompensas',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        steps: RewardsOnboarding,
      },
    ]);
  }, []);

  useEffect(() => {
    const currentAdventureId = classDetails?.current_adventure?.id;
    if (currentAdventureId) {
      (async (adventureId: number | string) => {
        try {
          const {
            data,
          }: { data: { responseData: (IReward & { usedCount?: number })[] } } =
            await getRewardsByAdventure(adventureId, classId);
          const { data: studentsData } = await studentsByClass(classId, {
            role: 'student',
            rewards: true,
          });
          const rewardsWithUsedCount = data.responseData.map((reward) => {
            return {
              ...reward,
              usedCount: usedRewardCount(reward.id, studentsData.responseData),
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
      })(currentAdventureId);
    }
  }, [classId, searchParams, classDetails?.current_adventure?.id]);

  if (!classDetails?.current_adventure)
    return (
      <ContentBox className="align-items-center p-5">
        <Typography
          component="h4"
          variant="h4"
          fontWeight="bold"
          className="mb-2"
        >
          ¡Aún no has seleccionado una aventura!
        </Typography>
        <Typography component="span" variant="body1">
          Debes seleccionar una aventura para poder ver las recompensas.
        </Typography>
        <div className="mt-4">
          <Button variant="contained" size="large" onClick={handleNavigate}>
            Selecciona una aventura
          </Button>
        </div>
      </ContentBox>
    );

  return (
    <ContentBox className="p-5">
      <Typography
        component="h4"
        variant="h4"
        fontWeight="bold"
        className="mb-2"
      >
        Recompensas
      </Typography>
      <Typography component="p" variant="body1" className="mb-2">
        En esta sección podrás gestionar las recompensas del curso y de tus
        estudiantes. ¡Las recompensas son una herramienta muy útil para mantener
        la motivación a tope!
      </Typography>
      <section>
        <Typography
          component="h5"
          variant="h5"
          fontWeight="bold"
          className="mb-2"
        >
          Recompensas individuales
        </Typography>
        <Typography component="p" variant="body1" className="mb-2">
          Las recompensas individuales se otorgan a todos los estudiantes
          individualmente cuando alcanzan el puntaje indicado en la recompensa.
          Puedes editarlas haciendo click en <b>“editar”</b>. Puedes marcar los
          estudiantes que ya han utilizado su recompensa haciendo click en la
          tarjeta.
        </Typography>
        <RewardsList id="rewards-list">
          {rewards.map((res, index) => {
            return (
              <RewardCard
                id={index}
                edit={editReward}
                key={`${res.id}-${res.title}`}
                rewardId={res.id}
                title={res.title}
                description={res.description}
                icon={res.icon}
                requiredPoints={res.required_points}
                type={res.type}
                order={index + 1}
                usedCount={res.usedCount}
              />
            );
          })}
        </RewardsList>
      </section>
    </ContentBox>
  );
};

export default Rewards;
