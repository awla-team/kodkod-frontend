import { FC, useEffect, useState } from 'react';
import { RewardsBox, RewardsList } from './styled';
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import RewardCard from '../../../components/RewardCard';
import { useSearchParams } from 'react-router-dom';
import { getRewardsByAdventure } from '../../../services/rewards';
import { IReward } from '../../../global/interfaces';
import Toaster from '../../../utils/Toster';
import http from 'global/api';
import { AxiosResponse } from 'axios';

const Rewards: FC = () => {
  const { classId } = useParams();
  const [searchParams] = useSearchParams();
  const [rewards, setRewards] = useState<IReward[]>([]);

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
      .catch((error) => {
        console.log(error);
        if (error?.response?.data?.responseData === 'Empty data')
          Toaster('error', 'Todos los campos deben ser llenados');
        else Toaster('error', 'Hubo un error al cargar las recompensas');
        return error;
      });
  };

  useEffect(() => {
    const id = searchParams.get('adventureId');
    if (id) {
      (async (adventureId: number | string) => {
        try {
          const { data }: { data: { responseData: IReward[] } } =
            await getRewardsByAdventure(adventureId, classId);

          const sorted = data.responseData.sort((a, b) => {
            if (a.required_points > b.required_points) return 1;
            if (a.required_points < b.required_points) return -1;
            return 0;
          });
          setRewards(sorted);
        } catch (error: unknown) {
          console.error(error);
          Toaster('error', 'Hubo un error al cargar las recompensas');
        }
      })(id);
    }
  }, [classId, searchParams]);

  return (
    <Box>
      <RewardsBox className="p-5">
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
          estudiantes. ¡Las recompensas son una herramienta muy útil para
          mantener la motivación a tope!
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
            individualmente cuando alcanzan el puntaje indicado en la
            recompensa. Puedes editarlas haciendo click en “editar”. Puedes
            marcar los estudiantes que ya han utilizado su recompensa haciendo
            click en la tarjeta.
          </Typography>
        </section>
        <section>
          <Typography
            component="h5"
            variant="h5"
            fontWeight="bold"
            className="mb-2"
          >
            Recompensas de curso
          </Typography>
          <Typography component="p" variant="body1" className="mb-2">
            Las recompensas de curso se otorgan a todos los estudiantes del
            curso cuando se completan ciertos porcentajes de misiones como
            grupo. Puedes editarlas haciendo click en “editar”
          </Typography>
        </section>
        <Box className="mt-5">
          <RewardsList className="d-flex gap-5 pb-4">
            {rewards.map((res) => {
              return (
                <RewardCard
                  edit={editReward}
                  key={`${res.id}-${res.title}`}
                  rewardId={res.id}
                  title={res.title}
                  description={res.description}
                  icon={res.icon}
                  requiredPoints={res.required_points}
                  type={res.type}
                />
              );
            })}
          </RewardsList>
        </Box>
      </RewardsBox>
    </Box>
  );
};

export default Rewards;
