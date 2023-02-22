import { FC } from "react";
import * as Styled from "./styled";
import { Stepper, Step, StepLabel, Button } from "@mui/material";
import { StepIconProps } from "@mui/material/StepIcon";

const CurrentStage: FC = () => {
  return (
    <Styled.CurrentStageContainer>
      <div className={"step-details"}>
        <Stepper activeStep={0} connector={<Styled.StyledStepConnector />}>
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
            Stage 1: <b>Start training</b>
          </div>
        </div>
      </div>

      <div className={"action-container"}>
        <Button variant={"contained"}>See rewards</Button>
        <Button variant={"contained"}>Unlock Stage 2</Button>
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
