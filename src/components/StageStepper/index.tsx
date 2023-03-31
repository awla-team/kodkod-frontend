import {
  FC,
  useContext,
  useState,
  useEffect,
} from "react";
import { CustomStepper } from "./styled";
import {
  Step,
  Button,
  Typography,
} from "@mui/material";
import { AdventureContext } from "../../routes/Class/Adventures/Adventure/provider";
import { IStage } from "global/interfaces";
import { UnlockStageConfirmationDialog } from "components/Modals";
import { unlockStage } from "services/stages";
import Toaster from "utils/Toster";

const StageStepper: FC<{ shownStage: IStage, stages: IStage[], onStageChange: (stage: IStage) => void }> = ({ shownStage, stages = [], onStageChange }) => {
  const { adventure, updateStageData } = useContext(AdventureContext);
  const [sortedStages, setSortedStages] = useState<IStage[]>([]);
  const [navigableStages, setNavigableStages] = useState<IStage[]>([]);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
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
      if (shownStage) onStageChange(stages.find((stage) => stage.id === shownStage.id));
      else setActiveStep(navigableStages[navigableStages.length - 1]._index);
    }
  }, [stages]);

  useEffect(() => {
    // When changing step, shown the proper stage
    const match = stages.find((stage) => stage._index === activeStep);
    onStageChange(match);
  }, [activeStep]);

  const handleUnlock = async () => {
    try {
      setLoading(true);
      if (adventure?.id_class_has_adventure) {
        const {
          data: { responseData },
        }: { data: { responseData: IStage } } = await unlockStage({
          id_class_has_adventure: adventure.id_class_has_adventure,
        });
        Toaster("success", `¡Etapa ${stages[navigableStages.length]._index} desbloqueada!`);
        updateStageData(responseData);
        setOpenDialog(false);
      }
    } catch (e: any) {
      Toaster("error", e.message);
    } finally {
      setLoading(false);
    }
  };  
  
  return (
    <div className="d-flex align-items-center justify-content-between gap-4">
      <div className="d-flex flex-column gap-3">
        <CustomStepper activeStep={activeStep - 1}>
          {sortedStages.map((stage) => {
            const isNavigable = navigableStages.includes(stage);
            const isActive = shownStage?._index === stage._index;
            
            return (
              <Step key={`step-${stage._index}`} completed={false}>
                <div role="button" className={`stage-step ${isNavigable ? 'navigable' : ''} ${isActive ? 'active' : ''}`} onClick={() => setActiveStep(stage._index)} />
              </Step>
            )
          })}
 
        </CustomStepper>
        <Typography component="span" variant="h6"><b>{`Etapa ${activeStep}: `}</b>{shownStage?.title}</Typography>
      </div>      
      {sortedStages.length && !sortedStages[sortedStages?.length - 1].active ? (
        <div>
          <Button
            variant={"contained"}
            onClick={() => setOpenDialog(true)}
            disabled={navigableStages.length === sortedStages.length}
            size="large"
          >
            Desbloquear etapa {sortedStages[navigableStages.length]._index}
          </Button>
          <UnlockStageConfirmationDialog
            unlockableStageData={sortedStages[navigableStages.length]}
            isLoading={loading}
            open={openDialog}
            handleClose={() => setOpenDialog(false)}
            onConfirm={handleUnlock}
          />
        </div>        
      ) : null}
    </div>    
  );
};
export default StageStepper;