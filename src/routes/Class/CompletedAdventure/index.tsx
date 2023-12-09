import React, { useState, useEffect } from 'react';
import { useClassContext } from '../context';
import { getClassHasAdventure } from 'services/adventures';
import { useParams } from 'react-router-dom';
import { Button, CircularProgress, Typography } from '@mui/material';
import { FetchStatus } from 'global/enums';
import {
  CompletedAdventureContainer,
  CompletedAdventureImg,
  DataCard,
} from './styled';
import { IClassHasAdventure } from 'global/interfaces';
import ImgTeamwork from 'assets/images/teamwork.png';
import ImgTime from 'assets/images/time.png';
import ImgReward from 'assets/images/reward.png';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

const CompletedAdventure: React.FC = () => {
  const { classDetails, loadingClass } = useClassContext();
  const { classHasAdventureId } = useParams();
  const [classHasAdventure, setClasHasAdventure] =
    useState<IClassHasAdventure>();
  const [loading, setLoading] = useState(FetchStatus.Idle);

  useEffect(() => {
    setLoading(FetchStatus.Pending);
    getClassHasAdventure(classHasAdventureId)
      .then((response) => {
        setClasHasAdventure(response.data.responseData);
        setLoading(FetchStatus.Success);
      })
      .catch((e) => {
        console.log(e);
        setLoading(FetchStatus.Error);
      });
  }, [classHasAdventureId]);

  if (
    (loadingClass !== FetchStatus.Success &&
      loadingClass !== FetchStatus.Error) ||
    (loading !== FetchStatus.Success && loading !== FetchStatus.Error)
  ) {
    return (
      <div className='d-flex w-100 align-items-center justify-content-center'>
        <CircularProgress />
      </div>
    );
  }

  if (classHasAdventure?.date_stop) {
    return (
      <CompletedAdventureContainer className='w-100 p-5'>
        <div className='d-flex justify-content-between w-100'>
          <div className='d-flex gap-4 align-items-center'>
            <CompletedAdventureImg
              src={classHasAdventure.adventure.finish_img_url}
            />
            <div className='d-flex flex-column'>
              <Typography component='h6' variant='h6'>
                {classDetails.alias} - {classHasAdventure.adventure.title}
              </Typography>
              <Typography component='h4' variant='h4' fontWeight='bold'>
                ¡Aventura finalizada!
              </Typography>
            </div>
          </div>
          <div className='d-flex flex-column align-items-end'>
            <Typography>
              Iniciada:{' '}
              <b>{moment(classHasAdventure.date_start).format('DD/MM/YYYY')}</b>
            </Typography>
            <Typography>
              Finalizada:{' '}
              <b>{moment(classHasAdventure.date_stop).format('DD/MM/YYYY')}</b>
            </Typography>
          </div>
        </div>
        <div className='d-flex mt-5 justify-content-center gap-4'>
          <DataCard className='d-flex gap-3 align-items-center'>
            <img src={ImgTeamwork} width='100' height='100' />
            <div className='d-flex flex-column'>
              <div className='d-flex gap-2 align-items-end'>
                <Typography variant='h3' fontWeight='bold'>
                  {classHasAdventure.missions_count}
                </Typography>
                <Typography variant='h6' fontWeight='bold'>
                  misiones
                </Typography>
              </div>
              <Typography variant='body1'>completadas como curso</Typography>
            </div>
          </DataCard>
          <DataCard className='d-flex gap-3 align-items-center'>
            <img src={ImgReward} width='100' height='100' />
            <div className='d-flex flex-column'>
              <div className='d-flex gap-2 align-items-end'>
                <Typography variant='h3' fontWeight='bold'>
                  {classHasAdventure.rewards_count}
                </Typography>
                <Typography variant='h6' fontWeight='bold'>
                  recompensas
                </Typography>
              </div>
              <Typography variant='body1'>obtenidas por estudiantes</Typography>
            </div>
          </DataCard>
          <DataCard className='d-flex gap-3 align-items-center'>
            <img src={ImgTime} width='100' height='100' />
            <div className='d-flex flex-column'>
              <div className='d-flex gap-2 align-items-end'>
                <Typography variant='h3' fontWeight='bold'>
                  {Math.abs(
                    moment(classHasAdventure.date_stop).diff(
                      moment(classHasAdventure.date_start),
                      'week'
                    )
                  )}
                </Typography>
                <Typography variant='h6' fontWeight='bold'>
                  semanas
                </Typography>
              </div>
              <Typography variant='body1'>
                aprendiendo de esta aventura
              </Typography>
            </div>
          </DataCard>
        </div>
        <div className='d-flex flex-column mt-5 align-items-center gap-1'>
          <Typography>
            ¡Buen trabajo! Nos esperan nuevas y divertidas aventuras para seguir
            aprendiendo en conjunto.
          </Typography>
          <Typography fontWeight='bold' variant='h6'>
            ¡Felicitaciones a tod@s por terminar esta aventura!
          </Typography>
        </div>
        <div className='d-flex align-items-center justify-content-center mt-4'>
          <Button
            component={Link}
            to={`/app/cursos/${classDetails.id}/aventuras/completed`}
            color='primary'
            variant='contained'
            size='large'
          >
            Ver mis aventuras finalizadas
          </Button>
        </div>
      </CompletedAdventureContainer>
    );
  } else {
    return <Navigate to={`/app/cursos/${classDetails.id}/aventuras/iniciar`} />;
  }
};

export default CompletedAdventure;
