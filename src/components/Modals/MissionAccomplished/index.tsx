import { FC } from 'react';
import { MissionAccomplishedProps } from './interfaces';
import { Drawer, Typography } from '@mui/material';
import MissionCard from '../../MissionCard';
import StudentsSelectableList from 'components/StudentsSelectableList';

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
    <Drawer open={open} anchor={anchor} onClose={onClose} PaperProps={{ className: 'p-5' }}>
      <Typography component="h6" variant="h6" fontWeight="bold" className="mb-3">
        ¡Misión cumplida!
      </Typography>
      <div className="mb-4">
        <MissionCard mission={mission} />
      </div>
      <Typography component="span" variant="body1" className="mb-3">
        Registra a los estudiantes que ya han cumplido con la misión seleccionada.
      </Typography>
      <StudentsSelectableList
        stage={stage}
        onSave={onSave}
        handleClose={handleClose}
        mission={mission}
      />
    </Drawer>
  );
};

export default MissionAccomplished;
