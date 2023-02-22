import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GoalSelection from "./GoalSelection";
import { FetchStatus } from "global/enums";
import { CircularProgress } from "@mui/material";
import Toaster from "utils/Toster";
import { getClassByID } from "services/classes";
import { ClassInterface } from "services/classes/interfaces";
import AdventureWithProvider, { Adventure } from "./Adventure";

const Adventures: React.FC = () => {
  const { classId } = useParams();
  const [currentAdventure, setCurrentAdventure] = useState(null);
  const [loading, setLoading] = useState<FetchStatus>(FetchStatus.Idle);

  useEffect(() => {
    if (classId) {
      setLoading(FetchStatus.Pending);
      getClassByID(classId)
        .then(
          ({
            data: { responseData },
          }: {
            data: { responseData: ClassInterface };
          }) => {
            if (responseData.current_adventure) {
              setCurrentAdventure(responseData.current_adventure);
            }
            setLoading(FetchStatus.Success);
          }
        )
        .catch((error) => {
          Toaster("error", error.message);
          setLoading(FetchStatus.Error);
        });
    }
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
    <>
      <AdventureWithProvider adventure={currentAdventure} />
      {/*<ViewContainer>*/}
      {/*    <h2>Empieza una aventura &#128640;</h2>*/}
      {/*    <p>*/}
      {/*        Una aventura es una serie de misiones planificadas que el estudiante*/}
      {/*        debe completar para desarrollar habilidades específicas. ¡Escoge una*/}
      {/*        aventura y desafía a tus estudiantes!*/}
      {/*    </p>*/}
      {/*    <div className="mb-4">*/}
      {/*        <SectionSubtitle*/}
      {/*            filled*/}
      {/*            lineColor={theme.palette.primary.main}*/}
      {/*            textColor="white"*/}
      {/*        >*/}
      {/*            Habilidades cognitivas*/}
      {/*        </SectionSubtitle>*/}
      {/*        <div className="row my-3">*/}
      {/*            {adventures*/}
      {/*                .filter(*/}
      {/*                    (adventure: IAdventure) => adventure.category === "Cognition"*/}
      {/*                )*/}
      {/*                .map((adventure: IAdventure) => (*/}
      {/*                    <div*/}
      {/*                        key={adventure.id}*/}
      {/*                        className="col-4 col-lg-3 d-flex justify-content-center"*/}
      {/*                    >*/}
      {/*                        <Link to={`${adventure.id}`}>*/}
      {/*                            <AdventureCard*/}
      {/*                                stagesDuration={adventure.stagesDuration}*/}
      {/*                                title={adventure.title}*/}
      {/*                                img={adventure.thumbnail}*/}
      {/*                                info={*/}
      {/*                                    <div>*/}
      {/*                                        {adventure?.adventureSkills?.map((skill) => (*/}
      {/*                                            <SkillPoints*/}
      {/*                                                key={`${adventure.id}-${skill.skillId}`}*/}
      {/*                                                skillId={skill.skillId}*/}
      {/*                                                points={skill.points}*/}
      {/*                                            />*/}
      {/*                                        ))}*/}
      {/*                                    </div>*/}
      {/*                                }*/}
      {/*                            />*/}
      {/*                        </Link>*/}
      {/*                    </div>*/}
      {/*                ))}*/}
      {/*        </div>*/}
      {/*    </div>*/}
      {/*    <div className="mb-4">*/}
      {/*        <SectionSubtitle*/}
      {/*            filled*/}
      {/*            lineColor={theme.palette.secondary.light}*/}
      {/*            textColor="white"*/}
      {/*        >*/}
      {/*            Habilidades socioemocionales*/}
      {/*        </SectionSubtitle>*/}
      {/*        <div className="row my-3">*/}
      {/*            {adventures*/}
      {/*                .filter(*/}
      {/*                    (adventure: IAdventure) => adventure.category === "Socioemotional"*/}
      {/*                )*/}
      {/*                .map((adventure: IAdventure) => (*/}
      {/*                    <div*/}
      {/*                        key={adventure.id}*/}
      {/*                        className="col-4 col-lg-3 d-flex justify-content-center"*/}
      {/*                    >*/}
      {/*                        <Link to={`${adventure.id}`}>*/}
      {/*                            <AdventureCard*/}
      {/*                                stagesDuration={adventure.stagesDuration}*/}
      {/*                                title={adventure.title}*/}
      {/*                                img={adventure.thumbnail}*/}
      {/*                                info={*/}
      {/*                                    <div>*/}
      {/*                                        {adventure?.adventureSkills?.map((skill) => (*/}
      {/*                                            <SkillPoints*/}
      {/*                                                key={`${adventure.id}-${skill.skillId}`}*/}
      {/*                                                skillId={skill.skillId}*/}
      {/*                                                points={skill.points}*/}
      {/*                                            />*/}
      {/*                                        ))}*/}
      {/*                                    </div>*/}
      {/*                                }*/}
      {/*                            />*/}
      {/*                        </Link>*/}
      {/*                    </div>*/}
      {/*                ))}*/}
      {/*        </div>*/}
      {/*    </div>*/}
      {/*</ViewContainer>*/}
    </>
  );
};

export default Adventures;
