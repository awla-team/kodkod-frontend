import { FC, useEffect, useState } from 'react';
import { RewardsBox, RewardsList } from './styled';
import { Box, Button, Typography } from '@mui/material';
import { Link as RouterLink, useParams } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import RewardCard from '../../../components/RewardCard';
import { useSearchParams } from 'react-router-dom';
import { getRewardsByAdventure } from '../../../services/rewards';
import { IReward } from '../../../global/interfaces';
import Toaster from '../../../utils/Toster';
import http from 'global/api';

const tempRewards = [
  {
    title: 'Recompensa 3',
    description: '¡Canjea esta recompensa con tu profesor/a!',
    required_points: '?',
    icon: 'https://kodkod-assets.s3.amazonaws.com/images/rewards/Reward_3.png',
    type: 'Individual',
  },
  {
    title: 'Recompensa 4',
    description: '¡Canjea esta recompensa con tu profesor/a!',
    required_points: '?',
    icon: 'https://kodkod-assets.s3.amazonaws.com/images/rewards/Reward_4.png',
    type: 'Individual',
  },
  {
    title: 'Recompensa 5',
    description: '¡Canjea esta recompensa con tu profesor/a!',
    required_points: '?',
    icon: 'https://kodkod-assets.s3.amazonaws.com/images/rewards/Reward_5.png',
    type: 'Individual',
  },
  {
    title: 'Recompensa 6',
    description: '¡Canjea esta recompensa con tu profesor/a!',
    required_points: '?',
    icon: 'https://kodkod-assets.s3.amazonaws.com/images/rewards/Reward_6.png',
    type: 'Individual',
  },
  {
    title: 'Recompensa 7',
    description: '¡Canjea esta recompensa con tu profesor/a!',
    required_points: '?',
    icon: 'https://kodkod-assets.s3.amazonaws.com/images/rewards/Reward_7.png',
    type: 'Individual',
  },
  {
    title: 'Recompensa 8',
    description: '¡Canjea esta recompensa con tu profesor/a!',
    required_points: '?',
    icon: 'https://kodkod-assets.s3.amazonaws.com/images/rewards/Reward_8.png',
    type: 'Individual',
  },
  {
    title: 'Recompensa 9',
    description: '¡Canjea esta recompensa con tu profesor/a!',
    required_points: '?',
    icon: 'https://kodkod-assets.s3.amazonaws.com/images/rewards/Reward_9.png',
    type: 'Individual',
  },
  {
    title: 'Recompensa 10',
    description: '¡Canjea esta recompensa con tu profesor/a!',
    required_points: '?',
    icon: 'https://kodkod-assets.s3.amazonaws.com/images/rewards/Reward_10.png',
    type: 'Individual',
  },
];

const Rewards: FC = () => {
  const { classId } = useParams();
  const [searchParams] = useSearchParams();
  const [rewards, setRewards] = useState<IReward[]>([]);

  const editReward = (
    rewardId: number | string,
    newTitle: string,
    newDescription: string,
  ) => {
    return http
      .put(`reward/${rewardId}`, {
        title: newTitle,
        description: newDescription,
      })
      .then((response: any) => {
        const newRewards = [...rewards];
        const matchReward = newRewards.findIndex((reward) => reward.id === rewardId);
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
          const { data }: { data: { responseData: IReward[] } } = await getRewardsByAdventure(
            adventureId,
            classId
          );

          const sorted = data.responseData.sort((a, b) => {
            if (a.required_points > b.required_points) return 1;
            if (a.required_points < b.required_points) return -1;
            return 0;
          });
          setRewards(sorted);
        } catch (error: any) {
          console.error(error);
          Toaster('error', 'Hubo un error al cargar las recompensas');
        }
      })(id);
    }
  }, []);

  return (
    <Box>
      <RewardsBox className="p-5">
        <Button
          className="mb-3"
          component={RouterLink}
          to={`/app/cursos/${classId}/aventuras`}
          size="large"
          startIcon={<ArrowBackIosIcon sx={{ fontSize: '16px!important' }} fontSize="small" />}
        >
          Volver a la aventura
        </Button>
        <Typography component="h4" variant="h4" fontWeight="bold" className="mb-2">
          Recompensas
        </Typography>
        <Typography component="span" variant="body1">
          Los estudiantes recibirán recompensas <b>automáticamente</b> cada vez que alcancen el
          puntaje indicado en ellas. Luego, en la vista <b>Progreso</b> puedes gestionar las
          recompensas de tus estudiantes.
        </Typography>
        <Box className="mt-5">
          <RewardsList className="d-flex gap-5 pb-4">
            {rewards.map((res, index) => {
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
            {tempRewards.map((res, index) => {
              return (
                <RewardCard
                  key={index}
                  rewardId={null}
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

      {/*<Box className={"rewards__sections"}>
        <Box className={"header__text"}> Class rewards </Box>
        <Box className={"subheading__text"}>
          <p>
            To unlock these rewards, you need to get the requested experience
            among the entire class. This will reward everyone equally!
          </p>
        </Box>
        <Box className={"rewards__container"}>
          <Box className={"rewards__scrollable__container"}>
            {Array(10)
              .fill("")
              .map((res, index) => {
                return (
                  <RewardCard
                    key={index}
                    title={"Invisibility cloak"}
                    description={"You can leave 10 minutes before recess"}
                    icon={""}
                    requiredPoints={res.requiredPoints}
                    type={"class"}
                  />
                );
              })}
          </Box>
        </Box>
      </Box>*/}
    </Box>
  );
};

export default Rewards;
