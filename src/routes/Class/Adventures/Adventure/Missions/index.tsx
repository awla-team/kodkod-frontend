import React, { FC, useContext, useState } from "react";
import { MissionContainer } from "./styled";
import MissionCard, { MissionCardType } from "components/MissionCard";
import ReplaceMissionModal from "components/Modals/ReplaceMissionModal";
import { MissionAccomplishedDrawer } from "components/Drawers";
import { AdventureContext } from "../provider";

const Missions: FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [selectedMission, setSelectedMission] =
    useState<null | MissionCardType>(null);

  const { adventure } = useContext(AdventureContext);
  debugger;
  const handleOpen = (missionDetails: MissionCardType) => {
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
        {!!adventure?.missions &&
          adventure?.missions.map((res, index) => {
            return (
              <MissionCard
                onClick={() => {
                  setOpenDrawer(true);
                  setSelectedMission(res);
                }}
                openModal={handleOpen}
                key={index}
                title={res.title}
                description={res.description}
                points={20}
                difficulty={res.difficulty}
              />
            );
          })}
      </div>

      <ReplaceMissionModal
        open={open && !!selectedMission}
        onClose={handleClose}
        mission={selectedMission}
      />
      <MissionAccomplishedDrawer
        open={openDrawer && !!selectedMission}
        anchor={"right"}
        onClose={handleDrawerClose}
        mission={selectedMission}
      />
    </MissionContainer>
  );
};
export default Missions;
