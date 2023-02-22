import React, { FC } from "react";
import { MissionContainer } from "./styled";
import MissionCard from "components/MissionCard";

const Missions: FC = () => {
  return (
    <MissionContainer>
      <h3 className={"section__heading"}>Missions</h3>

      <div className={"mission__content__container"}>
        {Array(3)
          .fill(1)
          .map((res, index) => {
            return (
              <MissionCard
                key={index}
                title={"Rewarding trip"}
                description={
                  "Write in your notebook a learning that you have had during the week"
                }
                qr={""}
                points={20}
                icon={""}
                color={"#000"}
              />
            );
          })}
      </div>
    </MissionContainer>
  );
};
export default Missions;
