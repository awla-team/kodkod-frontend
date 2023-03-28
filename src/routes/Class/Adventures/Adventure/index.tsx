import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Tabs,
  Tab,
  Button,
  Chip,
  Typography,
  Skeleton,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import AdventureProvider, { AdventureContext } from "./provider";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { AdventureContainer, AdventureBanner } from "./styled";
import SkillPoints from "components/SkillPoints";
import { AdventureWithProviderProps } from "../interfaces";
import CurrentStage from "./CurrentStage";
import StageRequirements from "./StageRequirements";
import Missions from "./Missions";
import Toaster from "utils/Toster";
import { cancelAdventureFromClass } from "services/adventures";

export const Adventure: React.FC = () => {
  const { classId } = useParams();
  const { adventure, makeAdventureNull } = useContext(AdventureContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);

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

  const handleVerticalButtonClick = ({
    currentTarget,
  }: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(currentTarget);
  };

  const cancelAdventure = async () => {
    try {
      setLoading(true);
      await cancelAdventureFromClass(adventure.id_class_has_adventure);
      makeAdventureNull();
    } catch (e: any) {
      Toaster("error", e.message);
    } finally {
      setLoading(false);
    }
  };

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
          <IconButton color={"inherit"} onClick={handleVerticalButtonClick}>
            <MoreVertIcon />
          </IconButton>

          <Menu
            open={!!anchorEl}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem disabled={loading} onClick={cancelAdventure}>Cancel adventure</MenuItem>
          </Menu>
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
  students,
  handleUpdateCurrentAdventure,
  updateStagesData,
  makeAdventureNull,
}) => (
  <AdventureProvider
    adventure={adventure}
    missions={missions}
    students={students}
    handleUpdateCurrentAdventure={handleUpdateCurrentAdventure}
    updateStagesData={updateStagesData}
    makeAdventureNull={makeAdventureNull}
  >
    <Adventure />
  </AdventureProvider>
);

export default AdventureWithProvider;
