import { type FC } from 'react';
import { type MissionAccomplishedProps } from './interfaces';
import { Typography } from '@mui/material';
import MissionCard from '../../MissionCard';
import StudentsSelectableList from 'components/StudentsSelectableList';
import { MissionAccomplishedDrawer } from './styled';

const MissionAccomplished: FC<MissionAccomplishedProps> = ({
  open,
  onSave,
  anchor = 'right',
  onClose,
  stage,
  mission,
}) => {
  const handleClose = () => {
    onClose(null);
  };

  return (
    <MissionAccomplishedDrawer
      open={open}
      anchor={anchor}
      onClose={onClose}
      PaperProps={{ className: 'px-5 py-4' }}
    >
      <Typography
        component='h6'
        variant='h6'
        fontWeight='bold'
        className='mb-3'
      >
        ¡Misión cumplida!
      </Typography>
      <div className='mb-4'>
        <MissionCard mission={mission} />
      </div>
      <Typography component='span' variant='body1' className='mb-3'>
        Registra a los estudiantes que ya han cumplido con la misión
        seleccionada.
      </Typography>
      <StudentsSelectableList
        stage={stage}
        onSave={onSave}
        handleClose={handleClose}
        mission={mission}
      />
    </MissionAccomplishedDrawer>
  );
};

export default MissionAccomplished;
