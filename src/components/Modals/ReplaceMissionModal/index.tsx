import React, { FC, useState } from "react";
import { ReplaceMissionModalProps } from "./interfaces";
import * as Styled from "./styled";
import CloseIcon from "@mui/icons-material/Close";
import { Button, IconButton, Typography } from "@mui/material";
import MissionCard, { Chip } from "../../MissionCard";
import { ReplaceMissionModalActions } from "./styled";

const ReplaceMissionModal: FC<ReplaceMissionModalProps> = ({
  open,
  onClose,
  mission,
}) => {
  const [selected, setSelected] = useState<null | number>(null);
  return (
    <Styled.ReplaceMissionModal
      open={open}
      onClose={(event, reason) => onClose(reason)}
      fullWidth={true}
      maxWidth={"sm"}
      scroll={"body"}
      disableEscapeKeyDown
    >
      <Styled.ReplaceMissionModalTitle>
        <IconButton color={"inherit"} onClick={() => onClose()}>
          <CloseIcon />
        </IconButton>
      </Styled.ReplaceMissionModalTitle>
      <Styled.ReplaceMissionModalContent>
        <div>
          <h1 className={"dialog__header__text"}>Change mission</h1>
          <span>
            Select a new mission to replace <b>"{mission?.title}"</b>:
          </span>
        </div>

        <div className={"mission__card__container"}>
          <div className={"mission__detail"}>
            Missions of{" "}
            <Chip className={"variant__contained"}>
              <span className={"icon"} />
              <span>Collaboration</span>
            </Chip>
            of difficulty
            <Chip className={"variant__outlined"} component={"span"}>
              <span className={"level__icon level__easy"} />
              <span>Easy</span>
            </Chip>
          </div>

          <div className={"mission__details_cards"}>
            <div className={"cards__view"}>
              {Array(3)
                .fill(1)
                .map((res, index) => {
                  return (
                    <MissionCard
                      onClick={() => setSelected(index)}
                      selected={index === selected}
                      key={index}
                      title={"Rewarding trip"}
                      description={
                        "Write in your notebook a learning that you have had during the week"
                      }
                      points={20}
                      icon={""}
                      color={"#000"}
                    />
                  );
                })}
            </div>
          </div>
        </div>
        <Styled.ReplaceMissionModalActions>
          <Button fullWidth variant={"contained"}>
            Change mission
          </Button>
        </Styled.ReplaceMissionModalActions>
      </Styled.ReplaceMissionModalContent>
    </Styled.ReplaceMissionModal>
  );
};
export default ReplaceMissionModal;
