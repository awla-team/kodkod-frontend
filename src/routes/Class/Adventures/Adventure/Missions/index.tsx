import React, { FC, useContext, useMemo, useState } from "react";
import { MissionContainer } from "./styled";
import MissionCard, { MissionCardType } from "components/MissionCard";
import ReplaceMissionModal from "components/Modals/ReplaceMissionModal";
import { MissionAccomplishedDrawer } from "components/Drawers";
import { AdventureContext } from "../provider";
import { IMission } from "global/interfaces";

const Missions: FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [selectedMission, setSelectedMission] = useState<null | IMission>(null);

  const { adventure } = useContext(AdventureContext);

  const stage = useMemo(() => {
    if (adventure.stages && adventure.stages.length) {
      return adventure.stages[0];
    } else {
      return null;
    }
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
        {!!stage?.missions &&
          stage?.missions?.map((res, index) => {
            return (
              <MissionCard
                onClick={() => {
                  setOpenDrawer(true);
                  setSelectedMission(res);
                }}
                mission={{ ...res, points: 20 }}
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
          stage={stage}
        />
      )}
      {openDrawer && !!selectedMission && (
        <MissionAccomplishedDrawer
          open={openDrawer && !!selectedMission}
          anchor={"right"}
          onClose={handleDrawerClose}
          mission={selectedMission}
        />
      )}
    </MissionContainer>
  );
};
export default Missions;
