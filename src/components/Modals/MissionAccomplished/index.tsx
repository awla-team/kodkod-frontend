import { FC, useEffect, useRef, useState } from "react";
import { MissionAccomplishedProps, StudentsDetailsType } from "./interfaces";
import { Button, Drawer, Typography } from "@mui/material";
import MissionCard from "../../MissionCard";
import { completedMissionByStudents } from "../../../services/missions";
import Toaster from "utils/Toster";
import StudentsSelectableList from "components/StudentsSelectableList";

const MissionAccomplished: FC<MissionAccomplishedProps> = ({
  open,
  anchor = "right",
  onClose,
  stage,
  mission,
}) => {
  const [studentsDetails, setStudentsDetails] = useState<StudentsDetailsType[]>([]);

  useEffect(() => {
    if (mission && stage) {
      getStudentsDetails();
    }
  }, [mission, stage]);

  const handleClose = () => {
    onClose(null);
  };

  const getStudentsDetails = async () => {
    try {
      const { data }: { data: { responseData: StudentsDetailsType[] } } =
        await completedMissionByStudents({
          id_mission: mission.id as number,
          id_stage: stage.id,
        });

      setStudentsDetails(data.responseData);
    } catch (e: any) {
      Toaster("error", e.messsage);
    }
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

      <StudentsSelectableList stage={stage} handleClose={handleClose} mission={mission} studentsDetails={studentsDetails} />
    </Drawer>
  );
};

export default MissionAccomplished;
