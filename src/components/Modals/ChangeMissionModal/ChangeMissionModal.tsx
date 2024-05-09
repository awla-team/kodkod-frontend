import { Box, Button, Typography } from '@mui/material';
import { useAuth } from 'contexts/AuthContext';
import { useModalStore } from 'contexts/ZustandContext/modal-context';
import { type IStage, type IMission } from 'global/interfaces';
import { type FC } from 'react';
import ReplaceMissionModal from '../ReplaceMissionModal';
import { CreateMissionModal } from '../CreateMissionModal';
import list from 'assets/images/list.png';
import idea from 'assets/images/idea.png';

interface Props {
  mission: IMission;
  stage: IStage;
  updateMissions: () => void;
}

const ChangeMissionModal: FC<Props> = ({ mission, stage, updateMissions }) => {
  const { setContentModal, openModal } = useModalStore();

  const openActualMissionModal = () => {
    // FIXME: fix this ts error
    // @ts-expect-error ts-error(2722)
    // open new modal
    setContentModal({
      content: (
        <ReplaceMissionModal
          open={true}
          mission={mission}
          stage={stage}
          updateMissions={updateMissions}
        />
      ),
      withActions: true,
    });
  };

  const openCreateMissionModal = () => {
    openModal({
      title: 'Crear y reemplazar por una nueva misión',
      content: (
        <CreateMissionModal
          mission={mission}
          stage={stage}
          updateMissions={updateMissions}
        />
      ),
      maxWidth: 'sm',
      withActions: false,
    });
  };

  return (
    <>
      <Typography variant='body2' className='mb-2'>
        Cambia esta misión por otra de la misma habilidad y dificultad. Recuerda
        que no puedes reemplazar una misión que ya ha sido completada por algún
        estudiante
      </Typography>

      <Box display='flex' gap={2}>
        <Button
          variant='contained'
          color='info'
          onClick={openActualMissionModal}
          sx={{
            color: 'black',
            fontWeight: 'bold',
            border: '1px solid black',
            display: 'flex',
            flexDirection: 'column',
            padding: '10px',
          }}
        >
          <img
            alt='list'
            src={list}
            style={{ width: '40px', objectFit: 'cover' }}
          />
          Reemplazar por una misión existente
        </Button>
        <Button
          variant='contained'
          color='info'
          onClick={openCreateMissionModal}
          sx={{
            color: 'black',
            fontWeight: 'bold',
            border: '1px solid black',
            display: 'flex',
            flexDirection: 'column',
            padding: '10px',
          }}
        >
          <img
            alt='list'
            src={idea}
            style={{ width: '40px', objectFit: 'cover' }}
          />
          Crear y reemplazar por una nueva misión
        </Button>
      </Box>
    </>
  );
};

export default ChangeMissionModal;
