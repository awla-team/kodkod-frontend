import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Tabs, Tab, Button, Chip, Typography } from "@mui/material";
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import SkillPoints from "../../../components/SkillPoints";
import { AdventureContainer, AdventureBanner } from "./styled";
import OverviewTab from "./OverviewTab";
import MissionsTab from "./MissionsTab";
import AdventureProvider, { AdventureContext } from "./provider";

const renderTab = (tab: number) => {
  switch(tab) {
    case 0:
      return <OverviewTab />;
    case 1:
      return <MissionsTab />;
    default:
      return <OverviewTab />;
  };
};

const AdventureWithProvider: React.FC = () => {
  const { adventureId } = useParams();

  return (
    <AdventureProvider adventureId={adventureId}>
      <Adventure />
    </AdventureProvider>
  );
};

const Adventure: React.FC = () => {
  const { adventure } = useContext(AdventureContext);
  const [selectedTab, setSelectedTab] = React.useState<number>(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => setSelectedTab(newValue);

  return (
    <div>
      {adventure ? (
        <AdventureContainer>
          <AdventureBanner className="d-flex flex-column p-lg-5 mb-4" backgroundImg={adventure.banner}>            
            <div className="mb-4">
              <Link to="/aventuras">
                <Button color="info" startIcon={<ChevronLeftRoundedIcon />}>Volver a Aventuras</Button>
              </Link>              
            </div>            
            <div className="mb-2">
              <Chip color="info" label="Previsualización" />
            </div>
            <div className="mb-3">
              <Typography variant="h3" component="h2" fontWeight="bold">{adventure.title}</Typography>
            </div>
            <div className="d-flex mb-1">
              {adventure?.adventureSkills?.map((skill) => (
                <div className="me-4" key={`${adventure.id}-${skill.skillId}`}>
                  <SkillPoints skillId={skill.skillId} points={skill.points} />
                </div>                
              ))}
            </div>
            <div className="mb-4">
              <Typography fontWeight="bold">{`Aventura de ${adventure.stagesDuration} etapas`}</Typography>
            </div>
            <div>
              <Button color="primary" size="large" variant="contained">Iniciar aventura</Button>
            </div>            
          </AdventureBanner>
          <Tabs value={selectedTab} onChange={handleTabChange}>
            <Tab label="Resumen" />
            <Tab label="Misiones" />
            <Tab label="Recompensas" />
          </Tabs>
          <div className="py-3 px-3">
            {renderTab(selectedTab)}
          </div>
        </AdventureContainer>
      ) : null}
    </div>
  );
};

export default AdventureWithProvider;
