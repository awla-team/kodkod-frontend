import React, {useState} from "react";
import {useOutletContext, useParams} from "react-router-dom";
import {DashboardContainer, DashboardContainerLeftSide, DashboardContainerRightSide, DetailsCard} from "./styled";
import ClassDetailsCard from "components/ClassDetailsCard";
import {useEffect} from "react";
import {ClassInterface} from "../../../services/classes/interfaces";
import {getClassByID} from "../../../services/classes";
import Toaster from "../../../utils/Toster";

const Board: React.FC<{}> = ({}) => {

    const {classDetails} = useOutletContext() as {classDetails: ClassInterface}


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
            </DetailsCard>
        </DashboardContainerRightSide>
    </DashboardContainer>
  );
};

export default Board;
