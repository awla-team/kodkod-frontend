import React from "react";
import { useParams } from "react-router-dom";
import {DashboardContainer, DashboardContainerLeftSide, DashboardContainerRightSide, DetailsCard} from "./styled";
import ClassDetailsCard from "../../../components/ClassDetailsCard";

const Board: React.FC<{}> = ({}) => {
  const { classId } = useParams();

  return (
    <DashboardContainer>
      <DashboardContainerLeftSide>
          <DetailsCard>
              <ClassDetailsCard/>
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
