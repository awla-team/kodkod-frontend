import { useEffect, useState, type FC } from 'react';
import { type ViewLearningGoalsDialogProps } from './interfaces';
import {
  Button,
  Typography,
  DialogTitle,
  DialogActions,
  DialogContent,
  Dialog,
  CircularProgress,
} from '@mui/material';
import { type ILearningGoal } from 'types/models/LearningGoal';
import Toaster from 'utils/Toster';
import { FetchStatus } from 'global/enums';
import { getLearningGoalsByUnit } from 'services/learning_goals';

const ViewLearningGoalsDialog: FC<ViewLearningGoalsDialogProps> = ({
  open,
  handleClose,
  currentUnit,
}) => {
  const [learningGoals, setLearningGoals] = useState<ILearningGoal[]>([]);
  const [messageIsShown, setMessageIsShown] = useState<boolean>(true);

  const getLearningGoals = () => {
    try {
      if (currentUnit) {
        getLearningGoalsByUnit(currentUnit?.id)
          .then((response: ILearningGoal[]) => {
            return response;
          })
          .then((learningGoalsList: ILearningGoal[]) => {
            setLearningGoals(learningGoalsList);
          })
          .catch((error: Error) => {
            console.error(error);
          });
      }
    } catch (error) {
      console.error(error);
      Toaster('error', 'Hubo un error al cargar los objetivos de aprendizaje');
    }
  };

  useEffect(() => {
    if (currentUnit) {
      getLearningGoals();
    } else {
      setTimeout(() => {
        setMessageIsShown(false);
      }, 5000);
    }
  }, [currentUnit]);

  return (
    <Dialog
      PaperProps={{ className: 'p-3' }}
      open={open}
      disableEscapeKeyDown
      onClose={handleClose}
    >
      {currentUnit ? (
        <div>
          <DialogTitle fontWeight='bold'>
            Unidad {currentUnit.title}
          </DialogTitle>
          <DialogContent dividers className='py-4'>
            <Typography textAlign='center' variant='h6' fontWeight='bold'>
              Objetivos de Aprendizaje
            </Typography>
            {learningGoals?.length ? (
              learningGoals?.map((learningGoal) => {
                return (
                  <Typography
                    key={learningGoal.id}
                    component='p'
                    variant='body1'
                    className='mb-3'
                  >
                    {'- ' + learningGoal.description}
                  </Typography>
                );
              })
            ) : (
              <Typography component='p' variant='body1' className='mb-3'>
                - No se establecieron Objetivos
              </Typography>
            )}
          </DialogContent>
          <DialogActions className='d-flex align-items-center mt-3'>
            <Button variant='contained' onClick={handleClose}>
              Cerrar
            </Button>
          </DialogActions>
        </div>
      ) : (
        <div>
          <DialogTitle fontWeight='bold'>Sin Datos</DialogTitle>
          <DialogContent dividers className='py-4'>
            <div className='mb-3'>
              <div className='mb-4'>
                <Typography
                  component='span'
                  variant='body1'
                  hidden={messageIsShown}
                  className='d-flex mb-4'
                >
                  No se encontro informacion al respecto. Tal ves falta
                  ingresarla?
                </Typography>

                <div className='d-flex w-100 h-100 justify-content-center align-items-center'>
                  <CircularProgress />
                </div>
              </div>
            </div>
          </DialogContent>
          <DialogActions className='d-flex align-items-center mt-3'>
            <Button variant='outlined' onClick={handleClose}>
              Cerrar
            </Button>
          </DialogActions>
        </div>
      )}
    </Dialog>
  );
};

export default ViewLearningGoalsDialog;
