import { type FC } from 'react';
import { type ViewLearningGoalsDialogProps } from './interfaces';
import {
  Button,
  Typography,
  DialogTitle,
  DialogActions,
  DialogContent,
  Dialog,
} from '@mui/material';

const ViewLearningGoalsDialog: FC<ViewLearningGoalsDialogProps> = ({
  open,
  handleClose,
  currentUnit,
}) => {
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
            {currentUnit.learning_goals?.length ? (
              currentUnit.learning_goals?.map((learningGoal) => {
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
                <Typography component='span' variant='body1'>
                  No se encontro informacion al respecto. Tal ves falta
                  ingresarla?
                </Typography>
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
