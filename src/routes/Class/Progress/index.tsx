import { FC, useEffect, useState } from "react";
import { ProgressProps } from "./interfaces";
import * as Styled from "./styled";
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

const Progress: FC<ProgressProps> = () => {
  const { classId } = useParams();
  const [students, setStudents] = useState<StudentType[]>([]);

  const getStudents = async () => {
    try {
      const { data }: { data: { responseData: StudentType[] } } =
        await studentsByClass(classId, {
          missions: true,
          role: "student",
          rewards:true
        });
      setStudents(data.responseData);
    } catch (e: any) {
      Toaster("error", e.message);
    }
  };

  useEffect(() => {
    if (classId) getStudents();
  }, [classId]);
  return (
    <Styled.ProgressContainer>
      <Box className={"title__section"}>
        <Typography
          variant={"h4"}
          fontWeight={700}
          className={"title__heading"}
        >
          Progress
        </Typography>

        <Typography my={1}>
          In this section you can see the missions and rewards that the students
          of your class have achieved over time. You can also click on a reward
          to mark it if it has already been claimed.
        </Typography>
      </Box>

      <Styled.KPICardContainer>
        <Styled.KPICard className={"completed__missions"}>
          <Typography className={"count"}>64</Typography>
          <Typography className={"text"}>Missions completed</Typography>
        </Styled.KPICard>
        <Styled.KPICard className={"finished__adventures"}>
          <Typography className={"count"}>0</Typography>
          <Typography className={"text"}>Adventures finished</Typography>
        </Styled.KPICard>
        <Styled.KPICard className={"rewards__obtained"}>
          <Typography className={"count"}>20</Typography>
          <Typography className={"text"}>Rewards obtained</Typography>
        </Styled.KPICard>
      </Styled.KPICardContainer>
      <Styled.ClassLeaderboardContainer>
        <Styled.ClassLeaderboardTable stickyHeader>
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
                <TableRow>
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
        </Styled.ClassLeaderboardTable>
      </Styled.ClassLeaderboardContainer>
    </Styled.ProgressContainer>
  );
};

export default Progress;
