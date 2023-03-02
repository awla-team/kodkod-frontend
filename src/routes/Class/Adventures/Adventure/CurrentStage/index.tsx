import { FC, useContext, useMemo } from "react";
import * as Styled from "./styled";
import { Stepper, Step, StepLabel, Button } from "@mui/material";
import { StepIconProps } from "@mui/material/StepIcon";
import { Link as RouterLink } from "react-router-dom";
import { AdventureContext } from "../provider";
import { IStage } from "global/interfaces";

const CurrentStage: FC = () => {
  const { adventure } = useContext(AdventureContext);

  const stage = useMemo((): IStage | null => {
    if (adventure.stages && adventure.stages.length) {
      return adventure.stages[0];
    }
    return null;
  }, [adventure]);
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
        <Button variant={"contained"} disabled>
          Unlock Stage 2
        </Button>
      </div>
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
