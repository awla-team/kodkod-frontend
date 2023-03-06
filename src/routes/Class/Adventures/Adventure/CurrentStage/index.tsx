import { FC, useContext, useMemo, useState } from "react";
import * as Styled from "./styled";
import { Stepper, Step, StepLabel, Button } from "@mui/material";
import { StepIconProps } from "@mui/material/StepIcon";
import { Link as RouterLink } from "react-router-dom";
import { AdventureContext } from "../provider";
import { IStage } from "global/interfaces";
import { sortStageByActiveStatus } from "utils";
import { UnlockStageConfirmationDialog } from "components/Modals";
import { unlockStage } from "services/stages";
import Toaster from "utils/Toster";

const CurrentStage: FC = () => {
  const { adventure } = useContext(AdventureContext);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const stage = useMemo((): IStage | null => {
    if (adventure.stages && adventure.stages.length) {
      return sortStageByActiveStatus(adventure.stages)[0];
    }
    return null;
  }, [adventure]);

  debugger

  const handleUnlock = async () => {
    try {
      setLoading(true);
      if (adventure?.id_class_has_adventure) {
        const {
          data: { responseData },
        }: { data: { responseData: IStage } } = await unlockStage({
          id_class_has_adventure: adventure.id_class_has_adventure,
        });
        Toaster("success", "Unlocked");
      }
    } catch (e: any) {
      Toaster("error", e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpenDialog(false);
  };
  return (
    <Styled.CurrentStageContainer>
      <div className={"step-details"}>
        <Stepper
          activeStep={(stage?._index || 0) - 1}
          connector={<Styled.StyledStepConnector />}
        >
          <Step>
            <StepLabel StepIconComponent={StepIconComponent} />
          </Step>
          <Step>
            <StepLabel StepIconComponent={StepIconComponent} />
          </Step>
          <Step>
            <StepLabel StepIconComponent={StepIconComponent} />
          </Step>
          <Step>
            <StepLabel StepIconComponent={StepIconComponent} />
          </Step>
        </Stepper>

        <div className={"stage-details"}>
          <div className={"round-icon"} />
          <div className={"stage-name"}>
            Stage {stage?._index || 0}: <b>{stage?.title}</b>
          </div>
        </div>
      </div>

      <div className={"action-container"}>
        <Button variant={"contained"} component={RouterLink} to={"rewards"}>
          See rewards
        </Button>
        <Button variant={"contained"} onClick={() => setOpenDialog(true)}>
          Unlock Stage 2
        </Button>
      </div>
      <UnlockStageConfirmationDialog
        isLoading={loading}
        open={openDialog}
        handleClose={handleClose}
        onConfirm={handleUnlock}
      />
    </Styled.CurrentStageContainer>
  );
};

export default CurrentStage;

const StepIconComponent = ({ active, completed, className }: StepIconProps) => {
  return (
    <Styled.StepIconContainer
      className={className}
      active={active}
      completed={completed}
    />
  );
};
