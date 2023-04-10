import { FC, useEffect, useState } from "react";
import { ProgressProps } from "./interfaces";
import {
  Typography,
  Box,
  Button,
} from "@mui/material";
import { studentsByClass } from "services/students";
import { StudentType } from "components/StudentsList/interfaces";
import { ProgressContainer, StickyDataGrid } from "./styled";
import { useClassContext } from "../context";
import { getMissionsByClassAdventure } from "services/missions";
import { IMission, IUser } from "global/interfaces";
import AdventureProgress from "components/AdventureProgress";
import { GridColDef, GridSortModel } from '@mui/x-data-grid';
import kodcoinIcon from "assets/images/kodcoin.png";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const Progress: FC<ProgressProps> = () => {
  const { classDetails } = useClassContext();
  const [students, setStudents] = useState<IUser[]>([]);
  const [missions, setMissions] = useState<IMission[]>([]);
  const [progressPercentage, setProgressPercentage] = useState<number | undefined>(undefined);
  const [averageCompletedMission, setAverageCompletedMission] = useState<number | undefined>(undefined);
  const [sortModel, setSortModel] = useState<GridSortModel>([
    {
      field: 'last_name',
      sort: 'asc',
    },
  ]);

  const columns: GridColDef[] = [
    {
      field: 'last_name',
      headerName: 'Apellidos',
      width: 200,
    },
    {
      field: 'first_name',
      headerName: 'Nombres',
      width: 200
    },
    {
      field: 'points',
      headerName: 'Puntaje',
      width: 130,
      type: 'number',
      renderCell: (value) => (
        <div className="d-flex align-items-center gap-1">
          <Typography variant="body2">{value.value}</Typography>
          <img src={kodcoinIcon} height="18" width="18" />
        </div>
      )
    },
    {
      field: 'completed_missions',
      headerName: 'Misiones completadas',
      width: 200,
      type: 'number',
    },
    {
      field: 'obtained_rewards',
      headerName: 'Recompensas obtenidas',
      width: 200,
      type: 'number',
    },
    {
      field: 'actions',
      type: 'actions',
      flex: 1,
      align: 'right',
      getActions: (params) => [
        <Button startIcon={<EmojiEventsIcon htmlColor="#FDC51A" fontSize="small" />} variant="outlined" size="small" onClick={() => {}}>
          Gestionar recompensas
        </Button>
      ],
    },
  ];

  useEffect(() => {
    if (classDetails) {
      (async () => {
        try {
          const { data }: { data: { responseData: IUser[] } } =
            await studentsByClass(classDetails.id, {
              missions: true,
              role: "student",
              rewards: true
            });
          const studentsWithTableFields = data.responseData.map((student) => ({ ...student, completed_missions: student.missions.length || 0, obtained_rewards: student.rewards.length || 0 }))
          setStudents(studentsWithTableFields);
        } catch (e: any) {
          Toaster("error", "Hubo un error al cargar los estudiantes");
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
      setAverageCompletedMission(completedMissions / students.length);
    }
    else {
      setProgressPercentage(0);
      setAverageCompletedMission(0);
    }
  }, [students, missions]);
  
  return (
    <ProgressContainer className="p-5">
      <Typography variant="h4" component="h4" fontWeight="bold" className="mb-2">Progreso</Typography>
      <Typography className="mb-4">En esta sección podrás ver el progreso de cada estudiante y del grupo curso. Podrás ver el puntaje en la aventura actual, el número de misiones completadas y las recompensas obtenidas. Además, puedes <b>gestionar el uso de recompensas</b> de los estudiantes.</Typography>
      
      {classDetails?.current_adventure ? (
        <AdventureProgress adventure={classDetails.current_adventure} progressPercentage={progressPercentage} averageCompletedMission={averageCompletedMission} />
      ) : null}
      <Box sx={{ maxHeight: 'calc(100vh - 160px)', overflow: 'auto'}}>
        <StickyDataGrid
          rows={students}
          columns={columns}
          autoHeight
          disableRowSelectionOnClick
          disableColumnMenu
          slotProps={{
            pagination: {
              labelRowsPerPage: 'Estudiantes por página',
              labelDisplayedRows: ({ from, to, count, page}) => `Total de ${count} estudiantes`
            }
          }}
          sortModel={sortModel}
          onSortModelChange={(model) => setSortModel(model)}
        />
      </Box>
    </ProgressContainer>
  );
};

export default Progress;
