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
  IconButton,
  Typography,
} from "@mui/material";
import { AdventureContext } from "../provider";
import { IStage } from "global/interfaces";
import { UnlockStageConfirmationDialog } from "components/Modals";
import { unlockStage } from "services/stages";
import Toaster from "utils/Toster";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const StageStepper: FC<{ stages: IStage[] }> = ({ stages = [] }) => {
  const { adventure, updateStagesData } = useContext(AdventureContext);
  const [shownStage, setShownStage] = useState<IStage | undefined>(undefined);
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
      setNavigableStages(navigableStages);
      setActiveStep(navigableStages[navigableStages.length - 1]._index);
    }
  }, [stages]);

  useEffect(() => {
    // When changing step, shown the proper stage
    const match = stages.find((stage) => stage._index === activeStep);
    setShownStage(match);
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
        updateStagesData(responseData);
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
      <div className="d-flex flex-column gap-2">
        <CustomStepper activeStep={activeStep - 1}>
          <IconButton
            size={"small"}
            onClick={() => setActiveStep(activeStep - 1)}
            disabled={activeStep === 1}
          >
            <NavigateBeforeIcon fontSize="small" />
          </IconButton>
          {stages.map((stage) => {
            const isNavigable = navigableStages.includes(stage);
            const isActive = shownStage?._index === stage._index;
            
            return (
              <Step key={`step-${stage._index}`} completed={false}>
                <div role="button" className={`stage-step ${isNavigable ? 'navigable' : ''} ${isActive ? 'active' : ''}`} onClick={() => setActiveStep(stage._index)} />
              </Step>

            )
          })}
          <IconButton
            size={"small"}            
            onClick={() => setActiveStep(activeStep + 1)}
            disabled={activeStep === navigableStages[navigableStages.length - 1]?._index}
          >
            <NavigateNextIcon fontSize="small" />
          </IconButton>
        </CustomStepper>
        <Typography component="span" variant="h6"><b>{`Etapa ${activeStep}: `}</b>{shownStage?.title}</Typography>
      </div>      
      {!stages[stages.length - 1].active ? (
        <div>
          <Button
            variant={"contained"}
            onClick={() => setOpenDialog(true)}
            disabled={navigableStages.length === stages.length}
            size="large"
          >
            Desbloquear etapa {stages[navigableStages.length]._index}
          </Button>
          <UnlockStageConfirmationDialog
            unlockableStageData={stages[navigableStages.length]}
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