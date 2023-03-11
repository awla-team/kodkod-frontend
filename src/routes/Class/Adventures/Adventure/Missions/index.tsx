import React, { FC, useContext, useMemo, useState } from "react";
import { MissionContainer } from "./styled";
import MissionCard, { MissionCardType } from "components/MissionCard";
import ReplaceMissionModal from "components/Modals/ReplaceMissionModal";
import { MissionAccomplishedDrawer } from "components/Drawers";
import { AdventureContext } from "../provider";
import {IMission, IStage} from "global/interfaces";
import {getActiveStage, getFirstNonActiveStage, sortStageByActiveStatus} from "utils";

const Missions: FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [selectedMission, setSelectedMission] = useState<null | IMission>(null);

  const { adventure } = useContext(AdventureContext);

  const stage = useMemo((): {
    stages: IStage[];
    activeStage: IStage | null;
    nextNonActiveStage: IStage | null;
  } | null => {
    if (adventure.stages && adventure.stages.length) {
      const stages = sortStageByActiveStatus(adventure.stages);
      return {
        stages,
        activeStage: getActiveStage(stages),
        nextNonActiveStage: getFirstNonActiveStage(stages),
      };
    }
    return null;
  }, [adventure]);
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
        {!!stage?.activeStage?.missions &&
          stage?.activeStage?.missions?.map((res, index) => {
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
          stage={stage.activeStage}
        />
      )}
      {openDrawer && !!selectedMission && (
        <MissionAccomplishedDrawer
          open={openDrawer && !!selectedMission}
          anchor={"right"}
          onClose={handleDrawerClose}
          mission={selectedMission}
          stage={stage.activeStage}
        />
      )}
    </MissionContainer>
  );
};
export default Missions;
