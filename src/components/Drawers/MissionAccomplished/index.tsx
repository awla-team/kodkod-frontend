import React, { FC } from "react";
import * as Styled from "./styled";
import { MissionAccomplishedProps } from "./interfaces";
import CloseIcon from "@mui/icons-material/Close";
import { Button, IconButton } from "@mui/material";
import MissionCard from "../../MissionCard";
import { StudentsSelectableList } from "../../SharedComponents";

const MissionAccomplished: FC<MissionAccomplishedProps> = ({
  open,
  anchor = "right",
  onClose,
  mission,
}) => {
  return (
    <Styled.MissionAccomplishedDrawer
      open={open}
      anchor={anchor}
      onClose={onClose}
    >
      <div className={"drawer__header"}>
        <IconButton color={"inherit"} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </div>

      <div className={"drawer__heading__text"}>Mission accomplished!</div>

      <div className={"card__container"}>
        <MissionCard
          title={"Rewarding trip"}
          description={
            "Write in your notebook a learning that you have had during the week"
          }
          points={20}
          icon={""}
          color={"#000"}
        />
      </div>

      <div className={"info__text"}>
        Select the students who have completed this mission:
      </div>

      <div className={"info__text__block"}>
        <img src={"/mobile.svg"} />
        <p className={"info__text"}>
          Remember that you can make this process easier by accessing from your
          phone and scanning the QR code of each student ;)
        </p>
      </div>

      <div className={"student__details__section"}>
        <StudentsSelectableList mission={mission} />
      </div>
      <div className={"student__list__actions"}>
        <Button variant={"contained"} fullWidth>
          Save Changes
        </Button>
      </div>
    </Styled.MissionAccomplishedDrawer>
  );
};

export default MissionAccomplished;
