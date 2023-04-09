import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  DashboardContainer,
  DashboardContainerLeftSide,
  DashboardContainerRightSide,
  DetailsCard,
} from "./styled";
import ClassDetailsCard from "components/ClassDetailsCard";
import { ClassInterface } from "services/classes/interfaces";
import StudentsList from "components/StudentsList";
import { StudentType } from "components/StudentsList/interfaces";
import EmotionalThermometer from "components/EmotionalThermometer";
import { Levels } from "components/Modals/CreateClassModal/interfaces";
import {useClassContext} from "../context";

const Board: React.FC<{}> = ({}) => {
  const { classDetails, students, levels } =
    useOutletContext() as {
      classDetails: ClassInterface;
      students: StudentType[];
      levels: Levels[];
    };

  return (
    <DashboardContainer>
      <DashboardContainerLeftSide>
        <DetailsCard>
          {classDetails && (
            <ClassDetailsCard classDetails={classDetails} levels={levels}/>
          )}
        </DetailsCard>
        <DetailsCard className="h-100 p-5">
          <EmotionalThermometer classDetails={classDetails} />
        </DetailsCard>
      </DashboardContainerLeftSide>
      <DashboardContainerRightSide>
        <DetailsCard className="h-100 p-5">
          <StudentsList studentsData={students} classDetails={classDetails} />
        </DetailsCard>
      </DashboardContainerRightSide>
    </DashboardContainer>
  );
};

export default Board;
