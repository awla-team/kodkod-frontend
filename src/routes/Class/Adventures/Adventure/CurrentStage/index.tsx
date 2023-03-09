import {
  FC,
  useContext,
  useMemo,
  useState,
  useReducer,
  useEffect,
  useCallback,
} from "react";
import * as Styled from "./styled";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Tooltip,
  Box,
  IconButton,
} from "@mui/material";
import { StepIconProps } from "@mui/material/StepIcon";
import { Link as RouterLink } from "react-router-dom";
import { AdventureContext } from "../provider";
import { IStage } from "global/interfaces";
import {
  getActiveStage,
  getFirstNonActiveStage,
  sortStageByActiveStatus,
} from "utils";
import { UnlockStageConfirmationDialog } from "components/Modals";
import { unlockStage } from "services/stages";
import Toaster from "utils/Toster";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { CurrentStageType } from "./interfaces";

const CurrentStage: FC = () => {
  const { adventure, updateStagesData } = useContext(AdventureContext);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [currentlyShowingStage, setCurrentlyShowingStage] =
    useState<IStage>(null);
  const reducer = (
    state: CurrentStageType,
    payload: { type: string; payload?: any }
  ) => {
    switch (payload.type) {
      case "save__stage": {
        const stages = sortStageByActiveStatus(adventure.stages);
        const activeStage = getActiveStage(stages);
        setCurrentlyShowingStage(activeStage);
        return {
          stages,
          activeStage,
          nextNonActiveStage: getFirstNonActiveStage(stages),
        };
      }
      default: {
        return state;
      }
    }
  };
  const [stage, dispatch] = useReducer(reducer, {
    stages: [],
    activeStage: null,
    nextNonActiveStage: null,
  });

  useEffect(() => {
    if (adventure.stages && adventure.stages.length) {
      dispatch({ type: "save__stage" });
    }
  }, [adventure]);

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
        updateStagesData(responseData);
        setOpenDialog(false);
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

  const handleStageChange = (index: number, stages: IStage[]) => {
    if (index >= 0 && index <= stages.length - 1) {
      setCurrentlyShowingStage(stages[index]);
    }
  };
  return (
    <Styled.CurrentStageContainer>
      <div className={"step-details"}>
        <Stepper
          activeStep={(stage?.activeStage?._index || 0) - 1}
          connector={<Styled.StyledStepConnector />}
        >
          {stage &&
            stage.stages.map((res, index) => {
              return (
                <Step key={index}>
                  <StepLabel StepIconComponent={StepIconComponent} />
                </Step>
              );
            })}
        </Stepper>

        {stage.stages.map((_stage: IStage, index: number, array: IStage[]) => {
          return (
            _stage.id === currentlyShowingStage?.id && (
              <Box display={"flex"} gap={1} alignItems={"center"} key={index}>
                <IconButton
                  color={"inherit"}
                  size={"small"}
                  onClick={() => handleStageChange(index - 1, array)}
                >
                  <NavigateBeforeIcon />
                </IconButton>
                <div className={"stage-details"}>
                  <div className={"round-icon"} />
                  <div className={"stage-name"}>
                    Stage {_stage._index || 0}: <b>{_stage.title}</b>
                  </div>
                </div>
                <IconButton
                  color={"inherit"}
                  size={"small"}
                  onClick={() => handleStageChange(index + 1, array)}
                >
                  <NavigateNextIcon />
                </IconButton>
              </Box>
            )
          );
        })}
      </div>

      <div className={"action-container"}>
        <Button
          variant={"contained"}
          component={RouterLink}
          to={"rewards?adventureId=" + adventure.id}
        >
          See rewards
        </Button>
        <Button
          variant={"contained"}
          onClick={() => setOpenDialog(true)}
          disabled={!stage?.nextNonActiveStage}
        >
          Unlock Stage {stage?.nextNonActiveStage?._index}
        </Button>
      </div>
      <UnlockStageConfirmationDialog
        unlockableStageData={stage?.nextNonActiveStage}
        isLoading={loading}
        open={openDialog && !!stage?.nextNonActiveStage}
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
