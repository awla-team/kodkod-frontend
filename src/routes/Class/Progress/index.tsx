import { FC, useEffect, useState } from "react";
import { ProgressProps } from "./interfaces";
import {
  Typography,
  Box,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { studentsByClass } from "services/students";
import { StudentType } from "components/StudentsList/interfaces";
import Toaster from "utils/Toster";
import { ProgressContainer, KPICardContainer, KPICard, ClassLeaderboardContainer, ClassLeaderboardTable } from "./styled";
import { useClassContext } from "../context";
import { getMissionsByClassAdventure } from "services/missions";
import { IMission } from "global/interfaces";
import AdventureProgress from "components/AdventureProgress";

const Progress: FC<ProgressProps> = () => {
  const { classDetails } = useClassContext();
  const [students, setStudents] = useState<StudentType[]>([]);
  const [missions, setMissions] = useState<IMission[]>([]);
  const [progressPercentage, setProgressPercentage] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (classDetails) {
      (async () => {
        try {
          const { data }: { data: { responseData: StudentType[] } } =
            await studentsByClass(classDetails.id, {
              missions: true,
              role: "student",
              rewards: true
            });
          setStudents(data.responseData);
        } catch (e: any) {
          console.log(e);
        }
      })();
      (async () => {
        try {
          const missionsResponse = await getMissionsByClassAdventure(classDetails?.current_adventure?.id_class_has_adventure);
          setMissions(missionsResponse.data.responseData);
        } catch (e: any) {
          console.log(e);
        }
      })();
    };
  }, [classDetails]);

  useEffect(() => {
    if (students?.length && missions?.length) {
      const completedMissions = students.reduce((accumulator, student) => accumulator + student.missions.length, 0);
      setProgressPercentage(completedMissions / (students.length * missions.length) * 100);
    }
    else setProgressPercentage(0);
  }, [students, missions]);  
  
  return (
    <ProgressContainer className="p-5">
      <Typography variant="h4" component="h4" fontWeight="bold" className="mb-2">Progreso</Typography>
      <Typography className="mb-4">En esta sección podrás ver el progreso de cada estudiante y del grupo curso. Podrás ver el puntaje en la aventura actual, el número de misiones completadas y las recompensas obtenidas. Además, puedes <b>gestionar el uso de recompensas</b> de los estudiantes.</Typography>
      
      {classDetails?.current_adventure ? (
        <AdventureProgress adventure={classDetails.current_adventure} progressPercentage={progressPercentage} />
      ) : null}
      <ClassLeaderboardContainer>
        <ClassLeaderboardTable stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Full name</TableCell>
              <TableCell>Points</TableCell>
              <TableCell>Mission accomplished</TableCell>
              <TableCell>Available rewards</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((res, index) => {
              return (
                <TableRow key={`student-row-${res.id}`}>
                  <TableCell className={"name"}>
                    {res.first_name} {res.last_name}
                  </TableCell>
                  <TableCell className={"points"}>{res.points}</TableCell>
                  <TableCell className={"accomplished"}>
                    {res?.missions?.length}
                  </TableCell>
                  <TableCell className={"available__rewards"}>
                    <Box className={"reward__points__container"}>
                      <span className={"reward__point"} />
                      <span className={"reward__point"} />
                      <span className={"reward__point"} />
                      <span className={"reward__point"} />
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </ClassLeaderboardTable>
      </ClassLeaderboardContainer>
    </ProgressContainer>
  );
};

export default Progress;
