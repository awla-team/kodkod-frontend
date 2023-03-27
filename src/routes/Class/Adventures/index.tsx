import React, { useState, useEffect } from "react";
import { Navigate, useOutletContext, useParams } from "react-router-dom";
import GoalSelection from "./GoalSelection";
import { FetchStatus } from "global/enums";
import { CircularProgress } from "@mui/material";
import Toaster from "utils/Toster";
import { getClassByID } from "services/classes";
import { ClassInterface } from "services/classes/interfaces";
import AdventureWithProvider from "./Adventure";
import { getMissionsByStage, StageMissionUpdateBody } from "services/missions";
import { IAdventure, IMission, IStage } from "global/interfaces";
import { studentsByClass } from "services/students";
import { StudentType } from "components/StudentsList/interfaces";
import AdventureSelection from "./AdventureSelection";

const Adventures: React.FC = () => {
  const [loading, setLoading] = useState<FetchStatus>(FetchStatus.Success);
  const [missions, setMissions] = useState<IMission[]>([]);
  const { classDetails, students } = useOutletContext() as {
    classDetails: ClassInterface;
    students: StudentType[];
  };

  useEffect(() => {
    getMissions();
  }, []);

  const handleUpdateCurrentAdventure = (
    missionData: IMission,
    ref: StageMissionUpdateBody
  ) => {
    /*setCurrentAdventure((prevState) => {
      if (prevState) {
        const tempData: IAdventure = JSON.parse(JSON.stringify(prevState));
        const { old_mission_id } = ref;
        const { missions } = tempData.stages[0];
        const index = missions.findIndex((res) => res.id === old_mission_id);
        if (index > -1) {
          missions[index] = missionData;
        }
        return tempData;
      }
      return prevState;
    });*/
  };

  const updateStagesData = (stage: IStage) => {
    if (stage) {
      /*setCurrentAdventure((prevState) => {
        if (prevState) {
          const tempData: IAdventure = JSON.parse(JSON.stringify(prevState));
          const { stages } = tempData;
          const index = stages.findIndex((res) => res.id === stage.id);
          if (index > -1) {
            stages[index] = stage;
          }
          return tempData;
        }
        return prevState;
      });*/
    }
  };

  const getMissions = async () => {
    try {
      const {
        data: { responseData },
      }: { data: { responseData: IMission[] } } = await getMissionsByStage();

      setMissions(responseData);
    } catch (e: any) {
      Toaster("error", e.message);
    }
  };
  
  if (loading === FetchStatus.Idle || loading === FetchStatus.Pending)
    return (
      <div className="d-flex w-100 align-items-center justify-content-center">
        <CircularProgress />
      </div>
    );

  if (!classDetails?.current_adventure) return <Navigate to="iniciar" />;

  return (
    <>
      <AdventureWithProvider
        adventure={classDetails.current_adventure}
        missions={missions}
        students={students}
        handleUpdateCurrentAdventure={handleUpdateCurrentAdventure}
        updateStagesData={updateStagesData}
      />
    </>
  );
};

export default Adventures;
