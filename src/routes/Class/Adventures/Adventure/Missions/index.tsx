import React, { FC, useState } from "react";
import { MissionContainer } from "./styled";
import MissionCard, { MissionCardType } from "components/MissionCard";
import ReplaceMissionModal from "components/Modals/ReplaceMissionModal";
import { MissionAccomplishedDrawer } from "components/Drawers";

const Missions: FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [selectedMission, setSelectedMission] =
    useState<null | MissionCardType>(null);

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
        {Array(3)
          .fill(1)
          .map((res, index) => {
            return (
              <MissionCard
                onClick={() => {
                  setOpenDrawer(true);
                  setSelectedMission(res);
                }}
                openModal={handleOpen}
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
