import React, { FC, useContext, useMemo, useState } from "react";
import { MissionContainer } from "./styled";
import MissionCard, { MissionCardType } from "components/MissionCard";
import ReplaceMissionModal from "components/Modals/ReplaceMissionModal";
import { MissionAccomplishedDrawer } from "components/Drawers";
import { AdventureContext } from "../provider";
import {IMission, IStage} from "global/interfaces";
import {getActiveStage, getFirstNonActiveStage, sortStageByActiveStatus} from "utils";

const Missions: FC<{ shownStage: IStage }> = ({ shownStage }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [selectedMission, setSelectedMission] = useState<null | IMission>(null);

  const handleOpen = (missionDetails: IMission) => {
    setSelectedMission(missionDetails);
    setOpen(true);
  };
  const handleClose = (reason?: "backdropClick" | "escapeKeyDown") => {
    if (reason !== "backdropClick") {
      setOpen(false);
      setSelectedMission(null);
    }
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
    setSelectedMission(null);
  };
  
  return (
    <MissionContainer>
      <h3 className={"section__heading"}>Missions</h3>

      <div className={"mission__content__container"}>
        {!!shownStage?.missions && shownStage?.missions?.map((res, index) => {
            return (
              <MissionCard
                onClick={() => {
                  setOpenDrawer(true);
                  setSelectedMission(res);
                }}
                mission={res}
                openModal={handleOpen}
                key={index}
              />
            );
          })}
      </div>

      {open && !!selectedMission && (
        <ReplaceMissionModal
          open={open && !!selectedMission}
          onClose={handleClose}
          mission={selectedMission}
          stage={shownStage}
        />
      )}
      {openDrawer && !!selectedMission && (
        <MissionAccomplishedDrawer
          open={openDrawer && !!selectedMission}
          anchor={"right"}
          onClose={handleDrawerClose}
          mission={selectedMission}
          stage={shownStage}
        />
      )}
    </MissionContainer>
  );
};
export default Missions;
