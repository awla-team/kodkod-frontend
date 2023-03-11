import { FC } from "react";
import { UnlockStageConfirmationDialogProps } from "./interfaces";
import * as Styled from "./styled";
import { Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { DialogActions } from "./styled";

const UnlockStageConfirmationDialog: FC<UnlockStageConfirmationDialogProps> = ({
  open,
  handleClose,
  onConfirm,
  isLoading,
  unlockableStageData,
}) => {
  return (
    <Styled.Dialog
      open={open}
      fullWidth={true}
      maxWidth={"sm"}
      scroll={"body"}
      disableEscapeKeyDown
      onClose={handleClose}
    >
      <Styled.DialogTitle>
        <div className={"close__icon__container"}>
          <IconButton
            color={"inherit"}
            onClick={handleClose}
            disabled={isLoading}
          >
            <CloseIcon />
          </IconButton>
        </div>

        <div className={"dialog__header__text"}>
          Your class is about to unlock stage {unlockableStageData?._index}!
        </div>
      </Styled.DialogTitle>
      <Styled.DialogContent>
        <p>
          Unlocking a new stage means that the class has worked hard and is
          ready to move on. Good job!
        </p>
        <h5 className={"heading__text"}>
          What will happen when you unlock the next stage?
        </h5>
        <ul>
          <li>
            <b>New missions</b> will appear that will allow you to gain more
            experience!
          </li>
          <li>
            With experience you can access <b>more rewards! </b>
          </li>
          <li> The missions of stage 1 will disappear :o</li>
        </ul>

        <div className={"confirmation__text heading__text"}>
          Are you ready to keep moving forward?
        </div>
      </Styled.DialogContent>
      <Styled.DialogActions>
        <Button variant={"contained"} disabled={isLoading} onClick={onConfirm}>
          Unlock Stage {unlockableStageData?._index}
        </Button>
      </Styled.DialogActions>
    </Styled.Dialog>
  );
};

export default UnlockStageConfirmationDialog;
