import React, {useState} from "react";
import {useOutletContext} from "react-router-dom";
import {DashboardContainer, DashboardContainerLeftSide, DashboardContainerRightSide, DetailsCard} from "./styled";
import ClassDetailsCard from "components/ClassDetailsCard";
import {ClassInterface} from "services/classes/interfaces";
import StudentsList from "components/StudentsList";

const Board: React.FC<{}> = ({}) => {

    const {classDetails, students} = useOutletContext() as {classDetails: ClassInterface, students: object[]}


  return (
    <DashboardContainer>
      <DashboardContainerLeftSide>
          <DetailsCard>
              {
                  classDetails &&  <ClassDetailsCard classDetails={classDetails}/>
              }

          </DetailsCard>
          <DetailsCard>
          </DetailsCard>

      </DashboardContainerLeftSide>
        <DashboardContainerRightSide>
            <DetailsCard className={'h-100'}>
                <StudentsList studentsData={students}/>
            </DetailsCard>
        </DashboardContainerRightSide>
    </DashboardContainer>
  );
};

export default Board;
