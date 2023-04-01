import React, { useContext, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Tabs,
  Tab,
  Button,
  Chip,
  Typography,
  Skeleton,
  IconButton,
} from "@mui/material";
import AdventureProvider, { AdventureContext } from "./provider";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { AdventureContainer, AdventureBanner } from "./styled";
import SkillPoints from "components/SkillPoints";
import { IStage } from "global/interfaces";
import { AdventureWithProviderProps } from "../interfaces";
import StageStepper from "../../../../components/StageStepper";
import MissionsList from "../../../../components/MissionsList";

export const Adventure: React.FC = () => {
  const { classId } = useParams();
  const { adventure } = useContext(AdventureContext);
  const [shownStage, setShownStage] = useState<IStage | undefined>(undefined);
  const navigate = useNavigate();

  if (!adventure)
    return (
      <AdventureContainer className="d-flex flex-column gap-3 p-0 m-0">
        <Skeleton
          variant="rounded"
          animation="wave"
          className="w-100"
          height={360}
        />
        <Skeleton
          variant="rounded"
          animation="wave"
          className="w-100"
          height={40}
        />
        <Skeleton
          variant="rounded"
          animation="wave"
          className="w-100"
          height={280}
        />
      </AdventureContainer>
    );

  const handleStageChange = (stage: IStage) => {
    setShownStage(stage);
  };  

  return (
    <AdventureContainer className="p-0 m-0">
      <AdventureBanner className="d-flex flex-column px-5 justify-content-center mb-4">
        <div className="d-flex justify-content-between align-items-end mb-3">
          <Typography variant="h4" component="h2" fontWeight="bold">
            {adventure.title}
          </Typography>
          <div>
            <Button
              variant={"outlined"}
              color="info"
              onClick={() => navigate(`recompensas?adventureId=${adventure.id}`)}
              size="large"
            >
              Ver recompensas disponibles
            </Button>
            <IconButton color={"inherit"}>
              <MoreVertIcon fontSize="large" />
            </IconButton>
          </div>
        </div>
        <div className="d-flex mb-1">
          {adventure?.skills?.map((skill) => (
            <div className="me-4" key={`${adventure.id}-${skill.id}`}>
              <SkillPoints skill={skill} />
            </div>
          ))}
        </div>
      </AdventureBanner>
      <div className="mt-5">
        <StageStepper shownStage={shownStage} stages={adventure?.stages} onStageChange={handleStageChange} />
      </div>      

      {/* StageRequirements
        <StageRequirements />
      StageRequirements ends*/}

      {/*    Missions*/}
      <div className="mt-4">
        <MissionsList shownStage={shownStage} />
      </div>      
      {/*    Missions ends*/}
    </AdventureContainer>
  );
};

const AdventureWithProvider: React.FC<AdventureWithProviderProps> = ({
  adventure,
  missions,
  students,
  handleUpdateCurrentAdventure,
  updateStageData,
}) => (
  <AdventureProvider
    adventure={adventure}
    missions={missions}
    students={students}
    handleUpdateCurrentAdventure={handleUpdateCurrentAdventure}
    updateStageData={updateStageData}
  >
    <Adventure />
  </AdventureProvider>
);

export default AdventureWithProvider;
