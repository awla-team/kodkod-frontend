import React, {useContext} from "react";
import {Link, useParams} from "react-router-dom";
import {Tabs, Tab, Button, Chip, Typography, Skeleton} from "@mui/material";
import AdventureProvider, {AdventureContext} from "./provider";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import {AdventureContainer, AdventureBanner} from "./styled";
import OverviewTab from "./OverviewTab";
import MissionsTab from "./MissionsTab";
import RewardsTab from "./RewardsTab";
import SkillPoints from "components/SkillPoints";
import TabContent from "components/TabContent";
import {IAdventureSkill} from "global/interfaces";

const AdventureWithProvider: React.FC = () => {
    const {adventureId} = useParams();

    return (
        <AdventureProvider adventureId={adventureId}>
            <Adventure/>
        </AdventureProvider>
    );
};

const Adventure: React.FC = () => {
    const {classId} = useParams();
    const {adventure} = useContext(AdventureContext);
    const [selectedTab, setSelectedTab] = React.useState<number>(0);

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) =>
        setSelectedTab(newValue);

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
                className="d-flex flex-column p-lg-5 mb-4"
                backgroundImg={adventure.banner}
            >
                <div className="mb-4">
                    <Link to={`/cursos/${classId}/aventuras`}>
                        <Button color="info" startIcon={<ChevronLeftRoundedIcon/>}>
                            Volver a Aventuras
                        </Button>
                    </Link>
                </div>
                <div className="mb-2">
                    <Chip color="info" label="Previsualización"/>
                </div>
                <div className="mb-3">
                    <Typography variant="h3" component="h2" fontWeight="bold">
                        {adventure.title}
                    </Typography>
                </div>
                <div className="d-flex mb-1">
                    {adventure?.adventureSkills?.map((skill: IAdventureSkill) => (
                        <div className="me-4" key={`${adventure.id}-${skill.skillId}`}>
                            <SkillPoints skillId={skill.skillId} points={skill.points}/>
                        </div>
                    ))}
                </div>
                <div className="mb-4">
                    <Typography fontWeight="bold">{`Aventura de ${adventure.stagesDuration} etapas`}</Typography>
                </div>
                <div>
                    <Button color="primary" size="large" variant="contained">
                        Iniciar aventura
                    </Button>
                </div>
            </AdventureBanner>
            <Tabs value={selectedTab} onChange={handleTabChange}>
                <Tab label="Resumen"/>
                <Tab label="Misiones"/>
                <Tab label="Recompensas"/>
            </Tabs>
            <TabContent className="py-3 px-3" value={selectedTab} index={0}>
                <OverviewTab/>
            </TabContent>
            <TabContent className="py-3 px-3" value={selectedTab} index={1}>
                <MissionsTab/>
            </TabContent>
            <TabContent className="py-3 px-3" value={selectedTab} index={2}>
                <RewardsTab/>
            </TabContent>
        </AdventureContainer>
    );
};

export default AdventureWithProvider;
