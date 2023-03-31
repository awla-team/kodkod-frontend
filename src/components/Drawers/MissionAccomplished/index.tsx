import React, { FC, useEffect, useRef, useState } from "react";
import * as Styled from "./styled";
import { MissionAccomplishedProps, StudentsDetailsType } from "./interfaces";
import CloseIcon from "@mui/icons-material/Close";
import { Button, IconButton } from "@mui/material";
import MissionCard from "../../MissionCard";
import { StudentsSelectableList } from "../../SharedComponents";
import { completedMissionByStudents } from "../../../services/missions";
import Toaster from "utils/Toster";

const MissionAccomplished: FC<MissionAccomplishedProps> = ({
  open,
  anchor = "right",
  onClose,
  stage,
  mission,
}) => {
  const [studentsDetails, setStudentsDetails] = useState<StudentsDetailsType[]>(
    []
  );

  const formButtonRef = useRef<HTMLButtonElement>();

  const handleFormButtonClick = () => {
    if (formButtonRef.current) formButtonRef.current.click();
  };

  useEffect(() => {
    if (mission && stage) {
      getStudentsDetails();
    }
  }, [mission, stage]);

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
        <MissionCard mission={mission} />
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
        <StudentsSelectableList
          ref={formButtonRef}
          mission={mission}
          studentsDetails={studentsDetails}
        />
      </div>
      <div className={"student__list__actions"}>
        <Button variant={"contained"} fullWidth onClick={handleFormButtonClick}>
          Save Changes
        </Button>
      </div>
    </Styled.MissionAccomplishedDrawer>
  );
};

export default MissionAccomplished;
