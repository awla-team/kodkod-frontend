import { Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import StageIcon from "../../../components/StageIcon";
import { IStage } from "../../../global/interfaces";
import { AdventureContext } from "../Adventure/provider";
import { MissionsListContainer } from "./styled";

const MissionsTab: React.FC = () => {
  const { adventure } = useContext(AdventureContext);
  const [shownStage, setShownStage] = useState<IStage | undefined>(adventure?.stages ? adventure?.stages[0] : undefined);

  const handleStageChange = (stage: IStage) => setShownStage(stage);
  
  return (
    <MissionsListContainer>
      {adventure?.stages && shownStage ? (
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <div className="me-3">
              <StageIcon selected icon={shownStage.icon} />
            </div>            
            <div className="d-flex flex-column justify-content-center">
              <Typography>{`Etapa ${shownStage.index}`}</Typography>
              <Typography variant="h4" fontWeight="bold">{shownStage.title}</Typography>
            </div>
          </div>        
          <div className="d-flex">
            {adventure?.stages?.map((stage, i) => (
              <>
                <div className="d-flex flex-column align-items-center" role="button" onClick={() => handleStageChange(stage)}>
                  <StageIcon icon={stage.icon} selected={shownStage.id === stage.id} />
                  <span>{`Etapa ${stage.index}`}</span>
                </div>
                {adventure?.stages && i < adventure?.stages?.length - 1 ? <hr /> : null}
              </>
            ))}            
          </div>
        </div>          
      ) : null}      
    </MissionsListContainer>    
  );
};

export default MissionsTab;
