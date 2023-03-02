import React, { FC, useState, useContext } from "react";
import { ReplaceMissionModalProps } from "./interfaces";
import * as Styled from "./styled";
import CloseIcon from "@mui/icons-material/Close";
import { Button, IconButton, Typography } from "@mui/material";
import MissionCard, { Chip } from "../../MissionCard";
import { AdventureContext } from "routes/Class/Adventures/Adventure/provider";
import { putDifficultyClass } from "utils";

const ReplaceMissionModal: FC<ReplaceMissionModalProps> = ({
  open,
  onClose,
  mission,
}) => {
  const [selected, setSelected] = useState<null | number>(null);
  const { missions } = useContext(AdventureContext);
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
        <div className={"close__icon__container"}>
          <IconButton color={"inherit"} onClick={() => onClose()}>
            <CloseIcon />
          </IconButton>
        </div>

        <div>
          <h1 className={"dialog__header__text"}>Change mission</h1>
          <span>
            Select a new mission to replace <b>"{mission?.title}"</b>:
          </span>
        </div>
      </Styled.ReplaceMissionModalTitle>
      <Styled.ReplaceMissionModalContent>
        <div className={"mission__card__container"}>
          <div className={"mission__detail"}>
            Missions of{" "}
            <Chip className={"variant__contained"}>
              <span className={"icon"} />
              <span>Collaboration</span>
            </Chip>
            of difficulty
            <Chip className={"variant__outlined"} component={"span"}>
              <span
                className={
                  "level__icon" + putDifficultyClass(mission?.difficulty)
                }
              />
              <span>{mission?.difficulty}</span>
            </Chip>
          </div>

          <div className={"mission__details_cards"}>
            <div className={"cards__view"}>
              {missions.map((res, index) => {
                return (
                  <MissionCard
                    onClick={() => setSelected(index)}
                    selected={index === selected}
                    key={index}
                    title={res.title}
                    description={res.description}
                    difficulty={res.difficulty}
                    points={20}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </Styled.ReplaceMissionModalContent>
      <Styled.ReplaceMissionModalActions>
        <Button fullWidth variant={"contained"}>
          Change mission
        </Button>
      </Styled.ReplaceMissionModalActions>
    </Styled.ReplaceMissionModal>
  );
};
export default ReplaceMissionModal;
