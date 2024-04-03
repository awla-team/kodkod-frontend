import { Box, Button, Typography } from '@mui/material';
import { useAuth } from 'contexts/AuthContext';
import { useModalStore } from 'contexts/ZustandContext/modal-context';
import { type IStage, type IMission } from 'global/interfaces';
import { type FC } from 'react';
import ReplaceMissionModal from '../ReplaceMissionModal';

interface Props {
  mission: IMission;
  stage: IStage;
}

const ChangeMissionModal: FC<Props> = ({ mission, stage }) => {
  const { setContentModal } = useModalStore();
  const { checkUserSubscription } = useAuth();

  const openActualMissionModal = () => {
    checkUserSubscription(
      'Reemplazar una misión es una funcionalidad Pro',
      () => {
        // FIXME: fix this ts error
        // @ts-expect-error ts-error(2722)
        // openModal();
        // open new modal
        setContentModal({
          content: (
            <ReplaceMissionModal
              // open={open && !!selectedMission}
              // onClose={handleClose}
              mission={mission}
              stage={stage}
            />
          ),
          withActions: true,
        });
      }
    );
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
          color='primary'
          onClick={openActualMissionModal}
        >
          Reemplazar por una misión existente
        </Button>
        <Button
          variant='contained'
          color='success'
          onClick={() => setContentModal(<p>reemplazar por nueva mision</p>)}
        >
          Crear y reemplazar por una nueva misión
        </Button>
      </Box>
    </>
  );
};

export default ChangeMissionModal;
