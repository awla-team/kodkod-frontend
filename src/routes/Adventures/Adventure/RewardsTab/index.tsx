import { Typography } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import RewardCard from "../../../../components/RewardCard";
import SectionSubtitle from "../../../../components/SectionSubtitle";
import { IReward } from "../../../../global/interfaces";
import theme from "../../../../global/theme";
import { getRewardsByAdventure } from "../../../../services/rewards";
import { groupBy } from "../../../../utils/array";
import { AdventureContext } from "../../Adventure/provider";
import { IRewardsByType } from "./interfaces";

const RewardsContainer = styled.div`
  ::-webkit-scrollbar {
    width: 2px;
    height: 12px;
  }
  ::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.palette.primary.main};
    border-radius: 20px;
    height: 2px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #68BCD5;
    max-height: 10px;
  }
  ::-webkit-scrollbar-track {
    background: #F6F6F6;
    border-radius: 20px;
  }
`;

const RewardsTab: React.FC = () => {
  const { adventure } = useContext(AdventureContext);
  const [rewardsByType, setRewardsByType] = useState<IRewardsByType>({});

  useEffect(() => {
    if (adventure) {
      getRewardsByAdventure(adventure.id)
      .then(({ data }) => setRewardsByType(groupBy(data, (i: IReward) => i.type)))
      .catch((e) => console.log(e));
    }
  }, [adventure]);
  
  return (
    <div>
      <div>
        <SectionSubtitle textColor={theme.palette.primary.main} lineColor={theme.palette.primary.main} >Recompensas individuales</SectionSubtitle>
        <Typography>Obtendrás las siguientes recompensas cuando alcances el puntaje requerido.</Typography>
        <RewardsContainer className="d-flex overflow-auto py-2">
          {rewardsByType?.single?.map((reward) => (
            <RewardCard key={`reward-${reward.id}`} title={reward.title} icon={reward.icon} description={reward.description} requiredPoints={reward.requiredPoints} type={reward.type}/>
          ))}
        </RewardsContainer>
      </div>
      <div className="mt-4">
        <SectionSubtitle textColor={theme.palette.secondary.main} lineColor={theme.palette.secondary.main} >Recompensas de curso</SectionSubtitle>
        <Typography>Obtendrás las siguientes recompensas el <b>puntaje del curso</b> sume el requerido.</Typography>
        <RewardsContainer className="d-flex overflow-auto py-2">
          {rewardsByType?.course?.map((reward) => (
            <RewardCard key={`reward-${reward.id}`} title={reward.title} icon={reward.icon} description={reward.description} requiredPoints={reward.requiredPoints} type={reward.type}/>
          ))}
        </RewardsContainer>
      </div>
    </div>    
  );
};

export default RewardsTab;
