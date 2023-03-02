import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
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
import OverviewTab from "./OverviewTab";
import MissionsTab from "./MissionsTab";
import RewardsTab from "./RewardsTab";
import SkillPoints from "components/SkillPoints";
import TabContent from "components/TabContent";
import { IAdventureSkill } from "global/interfaces";
import { AdventureWithProviderProps } from "../interfaces";
import CurrentStage from "./CurrentStage";
import StageRequirements from "./StageRequirements";
import Missions from "./Missions";

export const Adventure: React.FC = () => {
  const { classId } = useParams();
  const { adventure } = useContext(AdventureContext);

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

  return (
    <AdventureContainer className="p-0 m-0">
      <AdventureBanner
        className="d-flex flex-column"
        // backgroundImg={adventure.banner}
      >
        {/*<div className="mb-4">*/}
        {/*  <Link to={`/cursos/${classId}/aventuras`}>*/}
        {/*    <Button color="info" startIcon={<ChevronLeftRoundedIcon />}>*/}
        {/*      Volver a Aventuras*/}
        {/*    </Button>*/}
        {/*  </Link>*/}
        {/*</div>*/}

        <div className="mb-2 d-flex justify-content-between align-items-center">
          <Chip
            className={"chip-info"}
            color="info"
            label="Ongoing adventure"
          />
          <IconButton color={"inherit"}>
            <MoreVertIcon />
          </IconButton>
        </div>
        <div className="mb-3">
          <Typography variant="h3" component="h2" fontWeight="bold">
            {adventure.title}
          </Typography>
        </div>
        <div className="d-flex mb-1">
          {adventure?.skills?.map((skill) => (
            <div className="me-4" key={`${adventure.id}-${skill.id}`}>
              <SkillPoints skill={skill} />
            </div>
          ))}
        </div>
        {/*<div className="mb-4">*/}
        {/*  <Typography fontWeight="bold">{`Aventura de ${adventure.stagesDuration} etapas`}</Typography>*/}
        {/*</div>*/}
        {/*<div>*/}
        {/*  <Button color="primary" size="large" variant="contained">*/}
        {/*    Iniciar aventura*/}
        {/*  </Button>*/}
        {/*</div>*/}
      </AdventureBanner>

      {/*  Steps details */}
      <CurrentStage />
      {/*  Steps details ends*/}

      {/* StageRequirements */}
      <StageRequirements />
      {/*  StageRequirements ends*/}

      {/*    Missions*/}
      <Missions />
      {/*    Missions ends*/}
    </AdventureContainer>
  );
};

const AdventureWithProvider: React.FC<AdventureWithProviderProps> = ({
  adventure,
  missions,
}) => (
  <AdventureProvider adventure={adventure} missions={missions}>
    <Adventure />
  </AdventureProvider>
);

export default AdventureWithProvider;
