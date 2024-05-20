import { type FC, useContext, useState, useEffect } from 'react';
import { CustomStepper } from './styled';
import { Step, Button, Typography, Tooltip } from '@mui/material';
import { ClassHasAdventureContext } from '../../routes/Class/Adventures/Adventure/provider';
import { type IStage } from 'global/interfaces';
import { UnlockStageConfirmationDialog } from 'components/Modals';
import ViewLearningGoalsDialog from 'components/Modals/ViewLearningGoalsDialog';
import { unlockStage } from 'services/stages';
import Toaster from 'utils/Toster';

const StageStepper: FC<{
  shownStage: IStage;
  stages: IStage[];
  onStageChange: (stage: IStage) => void;
  handleFinish: () => void;
}> = ({ shownStage, stages = [], onStageChange, handleFinish }) => {
  const { classHasAdventure, updateStageData } = useContext(
    ClassHasAdventureContext
  );
  const [sortedStages, setSortedStages] = useState<IStage[]>([]);
  const [navigableStages, setNavigableStages] = useState<IStage[]>([]);
  const [activeStep, setActiveStep] = useState<number | undefined>(undefined);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openLearningObjetives, setOpenLearningObjetives] =
    useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Show last active stage at the beggining;
    if (stages.length) {
      const sorted = [...stages].sort((a, b) => {
        if (a._index > b._index) return 1;
        if (a._index < b._index) return -1;
        return 0;
      });
      const navigableStages = sorted.filter((stage) => stage.active);
      setSortedStages(sorted);
      setNavigableStages(navigableStages);
      if (shownStage)
        // FIXME: fix this ts error
        // @ts-expect-error ts-error(2345)
        onStageChange(stages.find((stage) => stage.id === shownStage.id));
      else setActiveStep(navigableStages[navigableStages.length - 1]._index);
    }
  }, [stages]);

  useEffect(() => {
    // When changing step, shown the proper stage
    const match = stages.find((stage) => stage._index === activeStep);
    if (match) onStageChange(match);
  }, [activeStep]);

  const handleUnlock = async () => {
    try {
      setLoading(true);
      if (classHasAdventure?.id) {
        const {
          data: { responseData },
        }: { data: { responseData: IStage } } = await unlockStage({
          id_class_has_adventure: classHasAdventure.id,
        });
        Toaster(
          'success',
          `¡Etapa ${sortedStages[navigableStages.length]._index} desbloqueada!`
        );
        updateStageData(responseData);
        setOpenDialog(false);
        setActiveStep(responseData._index);
      }
    } catch (error: any) {
      console.error(error);
      Toaster('error', 'Hubo un error al desbloquear la etapa');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id='adventure-stages'
      className='d-flex align-items-center justify-content-between gap-4'
    >
      {activeStep !== undefined ? (
        <div className='d-flex flex-column gap-3' id='adventure-stages-stepper'>
          <CustomStepper activeStep={activeStep - 1}>
            {sortedStages.map((stage) => {
              const isNavigable = navigableStages.includes(stage);
              const isActive = shownStage?._index === stage._index;

              return (
                <Step
                  key={`step-${stage._index}`}
                  completed={false}
                  disabled={!isNavigable}
                >
                  <div
                    role='button'
                    className={`stage-step ${isNavigable ? 'navigable' : ''} ${
                      isActive ? 'active' : ''
                    }`}
                    onClick={() => setActiveStep(stage._index)}
                  />
                </Step>
              );
            })}
          </CustomStepper>
          <Typography component='span' variant='h6'>
            <b>{`Etapa ${activeStep}: `}</b>
            {shownStage?.title}
          </Typography>
        </div>
      ) : null}
      {sortedStages.length ? (
        <div>
          {sortedStages[navigableStages.length] ? (
            <div className='d-flex flex-column gap-3'>
              <Tooltip
                arrow
                title={
                  <div className='d-flex flex-column p-1'>
                    ¿Qué sucederá al desbloquear la siguiente etapa?
                    <ul className='m-0'>
                      <li>
                        Verán nuevas misiones que les permitirán sumar más
                        puntos y recompensas
                      </li>
                      <li>
                        Las misiones de las etapas anteriores seguirán
                        disponibles para quienes aún no las hayan completado.
                      </li>
                    </ul>
                  </div>
                }
              >
                <Button
                  id='adventure-stage-unlock'
                  variant='contained'
                  onClick={() => setOpenDialog(true)}
                  disabled={navigableStages.length === sortedStages.length}
                  size='large'
                >
                  Desbloquear etapa{' '}
                  {sortedStages[navigableStages.length]._index}
                </Button>
              </Tooltip>
              <Button
                variant='contained'
                onClick={() => setOpenLearningObjetives(true)}
                size='large'
                color='success'
              >
                Ver Objetivos de Aprendizaje
              </Button>
            </div>
          ) : (
            <div className='d-flex flex-column gap-3'>
              <Tooltip
                arrow
                title={
                  <div className='p-1'>
                    ¿Qué sucederá al finalizar la aventura?
                    <ul className='m-0'>
                      <li>Los puntos de cada estudiante volverán a 0.</li>
                      <li>
                        No se podrán completar más misiones en esta aventura.
                      </li>
                      <li>
                        Tus estudiantes mantendrán las recompensas que ya
                        obtuvieron.
                      </li>
                    </ul>
                  </div>
                }
              >
                <Button
                  variant='contained'
                  onClick={() => setOpenDialog(true)}
                  size='large'
                >
                  ¡Completar etapa y finalizar aventura!
                </Button>
              </Tooltip>
              <Button
                variant='contained'
                onClick={() => setOpenLearningObjetives(true)}
                size='large'
                color='success'
              >
                Ver Objetivos de Aprendizaje
              </Button>
            </div>
          )}
          <UnlockStageConfirmationDialog
            unlockableStageData={sortedStages[navigableStages.length]}
            isLoading={loading}
            open={openDialog}
            currentStage={shownStage}
            handleClose={() => setOpenDialog(false)}
            // FIXME: fix this ts error
            // @ts-expect-error ts-error(2322)
            finishImg={classHasAdventure?.adventure?.finish_img_url}
            onConfirm={
              sortedStages[navigableStages.length] ? handleUnlock : handleFinish
            }
          />
          <ViewLearningGoalsDialog
            isLoading={loading}
            open={openLearningObjetives}
            currentStage={shownStage}
            handleClose={() => setOpenLearningObjetives(false)}
          />
        </div>
      ) : null}
    </div>
  );
};
export default StageStepper;
