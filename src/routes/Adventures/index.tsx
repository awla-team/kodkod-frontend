import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AdventuresContainer } from "./styled";
import ViewContainer from "../../components/ViewContainer";
import SectionSubtitle from "../../components/SectionSubtitle";
import theme from "../../global/theme";
import AdventureCard from "../../components/AdventureCard";
import { IAdventure } from "../../global/interfaces";
import { getAdventures } from "../../services/adventures";
import SkillPoints from "../../components/SkillPoints";

const Adventures: React.FC = () => {
  const [adventures, setAdventures] = useState([]);

  useEffect(() => {
    getAdventures()
      .then(({ data }) => setAdventures(data))
      .catch((e) => console.log(e));
  }, []);

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
