import { FC, useEffect, useRef, useState } from "react";
import { MissionAccomplishedProps, StudentsDetailsType } from "./interfaces";
import { Button, Drawer, Typography } from "@mui/material";
import MissionCard from "../../MissionCard";
import { completedMissionByStudents } from "../../../services/missions";
import Toaster from "utils/Toster";
import StudentsSelectableList from "components/StudentsSelectableList";

const MissionAccomplished: FC<MissionAccomplishedProps> = ({
  open,
  onSave,
  anchor = "right",
  onClose,
  stage,
  mission,
}) => {
  const handleClose = () => {
    onClose(null);
  };
  
  return (
    <Drawer
      open={open}
      anchor={anchor}
      onClose={onClose}
      PaperProps={{ className: "p-5", sx: { maxWidth: '500px' } }}
    >
      <Typography component="h6" variant="h6" fontWeight="bold" className="mb-3">¡Misión cumplida!</Typography>
      <div className="mb-4">
        <MissionCard mission={mission} />
      </div>
      <Typography component="span" variant="body1" className="mb-3">Registra a los estudiantes que ya han cumplido con la misión seleccionada.</Typography>

      {/*<div className={"info__text__block"}>
        <img src={"/mobile.svg"} />
        <p className={"info__text"}>
          Remember that you can make this process easier by accessing from your
          phone and scanning the QR code of each student ;)
        </p>
      </div>*/}

      <StudentsSelectableList stage={stage} onSave={onSave} handleClose={handleClose} mission={mission} />
    </Drawer>
  );
};

export default MissionAccomplished;
