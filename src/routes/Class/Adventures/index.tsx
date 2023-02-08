import React, { useState, useEffect } from "react";
import { IAdventure } from "global/interfaces";
import { Link, useParams } from "react-router-dom";
import theme from "global/theme";
import AdventureCard from "components/AdventureCard";
import SectionSubtitle from "components/SectionSubtitle";
import SkillPoints from "components/SkillPoints";
import ViewContainer from "components/ViewContainer";
import GoalSelection from "./GoalSelection";
import { FetchStatus } from "global/enums";
import { CircularProgress } from "@mui/material";
import { getClassCurrentAdventure } from "services/adventures";

const Adventures: React.FC = () => {
  const { classId } = useParams();
  const [adventures, setAdventures] = useState([]);
  const [currentAdventure, setCurrentAdventure] = useState(null);
  const [loading, setLoading] = useState<FetchStatus>(FetchStatus.Idle);

  useEffect(() => {
    setLoading(FetchStatus.Pending);
    getClassCurrentAdventure(classId)
      .then(({ data }) => {
        if (!!data?.adventures?.length) setCurrentAdventure(data.adventures[0]);
        setLoading(FetchStatus.Success);
      })
      .catch((error) => {
        console.error(error);
        setLoading(FetchStatus.Error);
      });
  }, [classId]);

  // useEffect(() => {
  //   getAdventures()
  //     .then(({ data }) => setAdventures(data))
  //     .catch((e) => console.log(e));
  // }, []);

  if (loading === FetchStatus.Idle || loading === FetchStatus.Pending)
    return (
      <div className="d-flex w-100 align-items-center justify-content-center">
        <CircularProgress />
      </div>
    );

  // TODO: if there is a goal associated with this class***
  if (!currentAdventure) return <GoalSelection />;

  return (
    <ViewContainer>
      <h2>Empieza una aventura &#128640;</h2>
      <p>
        Una aventura es una serie de misiones planificadas que el estudiante
        debe completar para desarrollar habilidades específicas. ¡Escoge una
        aventura y desafía a tus estudiantes!
      </p>
      <div className="mb-4">
        <SectionSubtitle
          filled
          lineColor={theme.palette.primary.main}
          textColor="white"
        >
          Habilidades cognitivas
        </SectionSubtitle>
        <div className="row my-3">
          {adventures
            .filter(
              (adventure: IAdventure) => adventure.category === "Cognition"
            )
            .map((adventure: IAdventure) => (
              <div
                key={adventure.id}
                className="col-4 col-lg-3 d-flex justify-content-center"
              >
                <Link to={`${adventure.id}`}>
                  <AdventureCard
                    stagesDuration={adventure.stagesDuration}
                    title={adventure.title}
                    img={adventure.thumbnail}
                    info={
                      <div>
                        {adventure?.adventureSkills?.map((skill) => (
                          <SkillPoints
                            key={`${adventure.id}-${skill.skillId}`}
                            skillId={skill.skillId}
                            points={skill.points}
                          />
                        ))}
                      </div>
                    }
                  />
                </Link>
              </div>
            ))}
        </div>
      </div>
      <div className="mb-4">
        <SectionSubtitle
          filled
          lineColor={theme.palette.secondary.light}
          textColor="white"
        >
          Habilidades socioemocionales
        </SectionSubtitle>
        <div className="row my-3">
          {adventures
            .filter(
              (adventure: IAdventure) => adventure.category === "Socioemotional"
            )
            .map((adventure: IAdventure) => (
              <div
                key={adventure.id}
                className="col-4 col-lg-3 d-flex justify-content-center"
              >
                <Link to={`${adventure.id}`}>
                  <AdventureCard
                    stagesDuration={adventure.stagesDuration}
                    title={adventure.title}
                    img={adventure.thumbnail}
                    info={
                      <div>
                        {adventure?.adventureSkills?.map((skill) => (
                          <SkillPoints
                            key={`${adventure.id}-${skill.skillId}`}
                            skillId={skill.skillId}
                            points={skill.points}
                          />
                        ))}
                      </div>
                    }
                  />
                </Link>
              </div>
            ))}
        </div>
      </div>
    </ViewContainer>
  );
};

export default Adventures;
