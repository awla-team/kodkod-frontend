import React, { FC, useEffect, useState } from "react";
import { MissionListContainer } from "./styled";
import MissionCard, { MissionCardType } from "components/MissionCard";
import ReplaceMissionModal from "components/Modals/ReplaceMissionModal";
import { MissionAccomplishedDrawer } from "components/Drawers";
import { AdventureContext } from "../../routes/Class/Adventures/Adventure/provider";
import {IMission, IStage} from "global/interfaces";
import {getActiveStage, getFirstNonActiveStage, sortStageByActiveStatus} from "utils";
import { Typography } from "@mui/material";

const MissionsList: FC<{ shownStage: IStage }> = ({ shownStage }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [selectedMission, setSelectedMission] = useState<null | IMission>(null);
  const [sortedMissions, setSortedMissions] = useState<IMission[]>([]);

  useEffect(() => {
    if (shownStage && shownStage.missions) {
      const missionsCopy = [...shownStage?.missions];
      missionsCopy.sort((a, b) => {
        if (a.title > b.title) return 1;
        if (a.title < b.title) return -1;
        return 0;
      });

      setSortedMissions(missionsCopy);
    }
  }, [shownStage]);

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
    <MissionListContainer className="p-5">
      <Typography component="h6" variant="h6" fontWeight="bold" className="mb-3">Lista de misiones</Typography>

      <div className="d-flex flex-wrap align-items-center justify-content-center gap-5">
        {sortedMissions.length ? (
          sortedMissions.map((res, index) => {
            return (
              <MissionCard
                  onClick={() => {
                    setOpenDrawer(true);
                    setSelectedMission(res);
                  }}
                  mission={res}
                  openModal={handleOpen}
                  key={`mission-${index}`}
                />
            );
          })
        ) : <Typography>Esta etapa aún no tiene misiones</Typography>}
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
    </MissionListContainer>
  );
};
export default MissionsList;
