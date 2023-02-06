import * as Styled from "./styled";
import { FC } from "react";
import { ConfirmationModalProps } from "./interface";
import { Button, DialogActions } from "@mui/material";

const ConfirmationModal: FC<ConfirmationModalProps> = ({
  open,
  onClose,
  callBackFunction,
  description,
  title,
}) => {
  return (
    <Styled.ConfirmationModal open={open} maxWidth={"sm"} fullWidth>
      <Styled.ConfirmationModalTitle>
        {title || "Confirmation"}
      </Styled.ConfirmationModalTitle>
      <Styled.ConfirmationModalContent>
        <div>{description || "Are you sure you want to delete ?"}</div>
      </Styled.ConfirmationModalContent>
      <DialogActions>
        <Styled.ActionButton
          variant={"contained"}
          className={"secondary__button"}
          onClick={() => onClose()}
        >
          No
        </Styled.ActionButton>
        <Styled.ActionButton
          variant={"contained"}
          onClick={() => callBackFunction()}
        >
          Yes
        </Styled.ActionButton>
      </DialogActions>
    </Styled.ConfirmationModal>
  );
};

export default ConfirmationModal;
