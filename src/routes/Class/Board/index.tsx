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

const Board: React.FC<{}> = ({}) => {
  const { classDetails, students } = useOutletContext() as {
    classDetails: ClassInterface;
    students: StudentType[];
  };

  return (
    <DashboardContainer>
      <DashboardContainerLeftSide>
        <DetailsCard>
          {classDetails && <ClassDetailsCard classDetails={classDetails} />}
        </DetailsCard>
        <DetailsCard></DetailsCard>
      </DashboardContainerLeftSide>
      <DashboardContainerRightSide>
        <DetailsCard className={"h-100"}>
          <StudentsList studentsData={students} classDetails={classDetails} />
        </DetailsCard>
      </DashboardContainerRightSide>
    </DashboardContainer>
  );
};

export default Board;
