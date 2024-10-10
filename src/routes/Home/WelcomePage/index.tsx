import type { FC } from 'react';
import { Typography } from '@mui/material';
import noClassesImg from 'assets/images/no-classes.png';

const WelcomePage: FC = () => {
  return (
    <div className='tw-w-full tw-flex tw-items-center tw-justify-center tw-p-5'>
      <div className='tw-flex tw-flex-col tw-items-center tw-justify-center tw-bg-white tw-p-5 tw-rounded-lg tw-border tw-border-gray-300 tw-w-[380px]'>
        <img className='tw-w-[300px] tw-mb-3' src={noClassesImg} />
        <div className='tw-text-justify'>
          <Typography
            component='h1'
            variant='h5'
            className='tw-font-bold tw-text-center tw-mb-3'
          >
            ¡Bienvenid@ a Kodkod!
          </Typography>
          <Typography
            component='div'
            variant='body1'
            className='tw-text-center tw-px-5 tw-mb-5'
          >
            Parece que aún no tienes cursos asociados a tu cuenta. Contacta con
            el administrador de la plataforma en tu colegio para asociar tus
            cursos.
          </Typography>
        </div>
      </div>
    </div>
  );
};
export default WelcomePage;
