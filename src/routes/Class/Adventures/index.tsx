import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GoalSelection from "./GoalSelection";
import { FetchStatus } from "global/enums";
import { CircularProgress } from "@mui/material";
import Toaster from "utils/Toster";
import { getClassByID } from "services/classes";
import { ClassInterface } from "services/classes/interfaces";
import AdventureWithProvider from "./Adventure";
import { getMissionsByStage, StageMissionUpdateBody } from "services/missions";
import { IAdventure, IMission } from "global/interfaces";
import { studentsByClass } from "services/students";
import { StudentType } from "components/StudentsList/interfaces";

const Adventures: React.FC = () => {
  const { classId } = useParams();
  const [currentAdventure, setCurrentAdventure] = useState<null | IAdventure>(
    null
  );
  const [loading, setLoading] = useState<FetchStatus>(FetchStatus.Idle);
  const [missions, setMissions] = useState<IMission[]>([]);
  const [students, setStudents] = useState<StudentType[]>([]);

  const handleUpdateCurrentAdventure = (
    missionData: IMission,
    ref: StageMissionUpdateBody
  ) => {
    setCurrentAdventure((prevState) => {
      if (prevState) {
        const tempData: IAdventure = JSON.parse(JSON.stringify(prevState));
        const { old_mission_id } = ref;
        const { missions } = tempData.stages[0];
        const index = missions.findIndex((res) => res.id === old_mission_id);
        if (index > -1) {
          missions[index] = missionData;
        }
        return tempData;
      }
      return prevState;
    });
  };

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

  const getMissions = async () => {
    try {
      const {
        data: { responseData },
      }: { data: { responseData: IMission[] } } = await getMissionsByStage();

      setMissions(responseData);
    } catch (e: any) {
      Toaster("error", e.message);
    }
  };

  const getAllTheStudentOfTheClass = async () => {
    try {
      const { data }: { data: { responseData: StudentType[] } } =
        await studentsByClass(classId, "student");
      setStudents(data.responseData);
    } catch (e: any) {
      Toaster("error", e.message);
    }
  };

  useEffect(() => {
    getMissions();
    getAllTheStudentOfTheClass();
  }, []);

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
      <AdventureWithProvider
        adventure={currentAdventure}
        missions={missions}
        students={students}
        handleUpdateCurrentAdventure={handleUpdateCurrentAdventure}
      />
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
