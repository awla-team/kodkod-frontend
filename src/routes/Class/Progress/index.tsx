import { type FC, useEffect, useState } from 'react';
import { type ProgressProps } from './interfaces';
import { Typography, Box } from '@mui/material';
import { ProgressContainer, StickyDataGrid } from './styled';
import { useClassContext } from '../context';
import { getMissionsByClassAdventure } from 'services/missions';
import { type IMission, type IUser } from 'global/interfaces';
import AdventureProgress from 'components/AdventureProgress';
import { type GridColDef, type GridSortModel } from '@mui/x-data-grid';
import kodcoinIcon from 'assets/images/kodcoin.png';
import RewardsModal from 'components/Modals/RewardsModal';
import { studentUseRewards } from 'services/rewards';
import Toaster from 'utils/Toster';
import { useOnboarding } from 'contexts/OnboardingContext';
import ProgressOnboarding from 'utils/Onboardings/ProgressOnboarding';
import { useTour } from '@reactour/tour';
import { getClassHasAdventureProgress } from 'services/adventures';

const Progress: FC<ProgressProps> = () => {
  const { classDetails } = useClassContext();
  const { setNewAvailableTours } = useOnboarding();
  const { setIsOpen, setSteps, setCurrentStep } = useTour();
  const [onboardingDone, setOnboardingDone] = useState(true);
  const [students, setStudents] = useState<IUser[]>([]);
  const [missions, setMissions] = useState<IMission[]>([]);
  const [progressPercentage, setProgressPercentage] = useState<
    number | undefined
  >(undefined);
  const [averageCompletedMission, setAverageCompletedMission] = useState<
    number | undefined
  >(undefined);
  const [openModal, setOpenModal] = useState<boolean>(false);
  // FIXME: fix this ts error
  // @ts-expect-error ts-error(2345)
  const [selectedStudent, setSelectedStudent] = useState<IUser>(undefined);
  const [sortModel, setSortModel] = useState<GridSortModel>([
    {
      field: 'last_name',
      sort: 'asc',
    },
  ]);

  const columns: GridColDef[] = [
    {
      field: 'first_name',
      headerName: 'Nombres',
      width: 200,
    },
    {
      field: 'last_name',
      headerName: 'Apellidos',
      width: 200,
    },
    {
      field: 'points',
      headerName: 'Puntos actuales',
      width: 130,
      type: 'number',
      renderCell: (value) => (
        <div className='d-flex align-items-center gap-1'>
          <Typography fontWeight='bold' variant='body2'>
            {value.value}
          </Typography>
          <img src={kodcoinIcon} height='18' width='18' />
        </div>
      ),
    },
    {
      field: 'completed_missions',
      headerName: 'Misiones completadas',
      flex: 1,
      type: 'number',
    },
    {
      field: 'obtained_rewards',
      headerName: 'Recompensas obtenidas',
      flex: 1,
      type: 'number',
    },
  ];

  useEffect(() => {
    const rawOnboardingData = localStorage.getItem('onboarding-data');
    // FIXME: fix this ts error
    // @ts-expect-error ts-error(2345)
    const onboardingData = JSON.parse(rawOnboardingData);
    setOnboardingDone(!!onboardingData?.progreso);
  }, []);

  useEffect(() => {
    // FIXME: fix this ts error
    // @ts-expect-error ts-error(2722)
    setNewAvailableTours([
      {
        name: 'Progreso del curso',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        steps: ProgressOnboarding,
      },
    ]);
  }, []);

  useEffect(() => {
    if (!onboardingDone) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      setSteps(ProgressOnboarding);
      setCurrentStep(0);
      setIsOpen(true);
    }
  }, [onboardingDone]);

  useEffect(() => {
    // FIXME: fix this eslint error
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    if (classDetails) getStudents();
    // FIXME: fix this eslint error
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    if (classDetails?.current_adventure) getMissions();
  }, [classDetails]);

  useEffect(() => {
    if (students?.length && missions?.length) {
      const completedMissions = students.reduce(
        (accumulator, student) =>
          // FIXME: fix this ts error
          // @ts-expect-error ts-error(18048)
          accumulator + student.user_has_stage_has_missions.length,
        0
      );
      setProgressPercentage(
        (completedMissions / (students.length * missions.length)) * 100
      );
      setAverageCompletedMission(completedMissions / students.length);
    } else {
      setProgressPercentage(0);
      setAverageCompletedMission(0);
    }
  }, [students, missions]);

  const getStudents = async () => {
    try {
      const students = await getClassHasAdventureProgress(
        // FIXME: fix this ts error
        // @ts-expect-error ts-error(18048)
        classDetails.current_adventure.id
      );
      const formattedStudents = students.data.map((student: IUser) => ({
        ...student,
        completed_missions: student.user_has_stage_has_missions?.length,
        obtained_rewards: student.user_has_rewards?.length,
      }));
      // FIXME: fix this eslint error
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setStudents(formattedStudents);
    } catch (e: any) {
      Toaster('error', 'Hubo un error al cargar los estudiantes');
    }
  };

  const getMissions = async () => {
    try {
      const missionsResponse = await getMissionsByClassAdventure(
        // FIXME: fix this ts error
        // @ts-expect-error ts-error(2345)
        classDetails?.current_adventure?.id
      );
      // FIXME: fix this eslint error
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setMissions(missionsResponse.data.responseData);
    } catch (e: any) {
      Toaster('error', 'Hubo un error al cargar las misiones');
    }
  };

  const handleSave = async (studentId: number, selectedRewards: number[]) => {
    try {
      await studentUseRewards(studentId, selectedRewards);
      Toaster('success', '¡Recompensas activadas exitosamente!');
      setOpenModal(false);
      // FIXME: fix this eslint error
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      getStudents();
    } catch (error) {
      console.log(error);
      Toaster('error', 'Ha ocurrido un error');
    }
  };

  return (
    <ProgressContainer className='p-5'>
      <Typography
        variant='h4'
        component='h4'
        fontWeight='bold'
        className='mb-2'
      >
        Progreso
      </Typography>
      <Typography className='mb-4'>
        En esta sección podrás ver el progreso de cada estudiante y del grupo
        curso. Podrás ver el puntaje en la aventura actual, el número de
        misiones completadas y las recompensas obtenidas. Además, puedes{' '}
        <b>gestionar el uso de recompensas</b> de los estudiantes.
      </Typography>

      {classDetails?.current_adventure ? (
        <AdventureProgress
          adventure={classDetails.current_adventure.adventure}
          // FIXME: fix this ts error
          // @ts-expect-error ts-error(2322)
          progressPercentage={progressPercentage}
          // FIXME: fix this ts error
          // @ts-expect-error ts-error(2322)
          averageCompletedMission={averageCompletedMission}
        />
      ) : (
        <div className='p-4 mb-3'>
          <Typography fontWeight='bold' textAlign='center' variant='h5'>
            Actualmente no tienen ninguna aventura en curso
          </Typography>
        </div>
      )}
      <Box
        id='progress-table'
        sx={{ maxHeight: 'calc(100vh - 160px)', overflow: 'auto' }}
      >
        <StickyDataGrid
          rows={students}
          columns={columns}
          autoHeight
          disableRowSelectionOnClick
          disableColumnMenu
          slotProps={{
            pagination: {
              labelRowsPerPage: 'Estudiantes por página',
              labelDisplayedRows: ({ from, to, count, page }) =>
                `Total de ${count} estudiantes`,
            },
          }}
          sortModel={sortModel}
          onSortModelChange={(model) => setSortModel(model)}
        />
      </Box>
      <RewardsModal
        open={openModal}
        student={selectedStudent}
        onClose={() => setOpenModal(false)}
        onSave={handleSave}
      />
    </ProgressContainer>
  );
};

export default Progress;
