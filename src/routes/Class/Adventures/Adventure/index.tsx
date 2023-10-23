import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Typography,
  Skeleton,
  IconButton,
  Menu,
  MenuItem,
  Box,
} from '@mui/material';
import AdventureProvider from './provider';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { AdventureContainer, AdventureBanner } from './styled';
import SkillPoints from 'components/SkillPoints';
import { IStage } from 'global/interfaces';
import { AdventureWithProviderProps } from '../interfaces';
import StageStepper from '../../../../components/StageStepper';
import Toaster from 'utils/Toster';
import {
  cancelAdventureFromClass,
  endClassHasAdventure,
} from 'services/adventures';
import MissionsList from '../../../../components/MissionsList';
import ConfirmationModal from 'components/Modals/ConfirmationModal';
import { useClassContext } from 'routes/Class/context';
import moment from 'moment';
import { useOnboarding } from 'contexts/OnboardingContext';
import AdventureOnboarding from 'utils/Onboardings/AdventureOnboarding';
import PointsOnboarding from 'utils/Onboardings/PointsOnboarding';
import { useTour } from '@reactour/tour';

export const Adventure: React.FC = () => {
  const { classId } = useParams();
  const { classDetails, setClassDetails } = useClassContext();
  const { setNewAvailableTours } = useOnboarding();
  const { setIsOpen, setSteps, setCurrentStep } = useTour();
  const [shownStage, setShownStage] = useState<IStage | undefined>(undefined);
  const [onboardingDone, setOnboardingDone] = useState(true);
  const [openConfirmation, setOpenConfirmation] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const rawOnboardingData = localStorage.getItem('onboarding-data');
    const onboardingData = JSON.parse(rawOnboardingData);
    setOnboardingDone(!!onboardingData?.aventuras);
  }, []);

  useEffect(() => {
    setNewAvailableTours([
      {
        name: 'Trabajando con una aventura',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        steps: AdventureOnboarding,
      },
      {
        name: 'Misiones y puntaje',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        steps: PointsOnboarding,
      },
    ]);
  }, []);

  useEffect(() => {
    if (!onboardingDone) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setSteps(AdventureOnboarding);
      setCurrentStep(0);
      setIsOpen(true);
    }
  }, [onboardingDone]);

  if (!classDetails.current_adventure) {
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
  }

  const handleVerticalButtonClick = ({
    currentTarget,
  }: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(currentTarget);
  };

  const cancelAdventure = async () => {
    try {
      setLoading(true);
      await cancelAdventureFromClass(
        classDetails.current_adventure.id_class_has_adventure
      );
      //await cancelAdventure(classDetails.current_adventure.id_class_has_adventure, { date_stop: moment().format('YYYY-MM-DD') });
      Toaster('success', 'La aventura fue cancelada');
      navigate(`/app/cursos/${classId}/tablero`);
      setClassDetails({
        ...classDetails,
        current_adventure: null,
      });
    } catch (error: any) {
      console.error(error);
      Toaster('error', 'Hubo un error al cancelar la aventura');
    } finally {
      setLoading(false);
    }
  };

  const finishAdventure = async () => {
    try {
      setLoading(true);
      await endClassHasAdventure(
        classDetails.current_adventure.id_class_has_adventure,
        {
          date_stop: moment().format('YYYY-MM-DD'),
        }
      );
      Toaster('success', '¡Felicitaciones! ¡La aventura ha sido completada!');
      setClassDetails({
        ...classDetails,
        current_adventure: null,
      });
      navigate(`/app/cursos/${classId}/aventuras/completed/${classDetails.current_adventure.id_class_has_adventure}`);
    } catch (error: any) {
      console.error(error);
      Toaster('error', 'Hubo un error al finalizar la aventura');
    } finally {
      setLoading(false);
    }
  };

  const handleStageChange = (stage: IStage) => {
    setShownStage(stage);
  };

  return (
    <AdventureContainer className="p-0 m-0">
      <AdventureBanner
        className="d-flex flex-column px-5 justify-content-center mb-4"
        sx={{
          backgroundImage: `url(${
            shownStage?.icon || classDetails.current_adventure.banner
          })`,
        }}
      >
        <div className="d-flex justify-content-between align-items-end mb-3">
          <Typography variant="h4" component="h2" fontWeight="bold">
            {classDetails.current_adventure.title}
          </Typography>
          <div>
            <IconButton color={'inherit'} onClick={handleVerticalButtonClick}>
              <MoreVertIcon fontSize="large" />
            </IconButton>
            <Menu
              open={!!anchorEl}
              anchorEl={anchorEl}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem
                disabled={loading}
                onClick={() => setOpenConfirmation(true)}
              >
                Terminar aventura
              </MenuItem>
            </Menu>
          </div>
        </div>
        <div className="d-flex mb-1">
          {classDetails.current_adventure?.skills?.map((skill) => (
            <div
              className="me-2"
              key={`${classDetails.current_adventure.id}-${skill.id}`}
            >
              <SkillPoints skill={skill} />
            </div>
          ))}
        </div>
      </AdventureBanner>
      {shownStage?.next_img_url && shownStage?.narrative ? (
        <Box className="d-flex align-items-center justify-content-center px-5">
          <img
            src={shownStage?.next_img_url}
            height="140"
            width="140"
            className="me-2"
          />
          <Typography>{shownStage?.narrative}</Typography>
        </Box>
      ) : null}
      <div className="mt-5">
        <StageStepper
          shownStage={shownStage}
          stages={classDetails.current_adventure?.stages}
          onStageChange={handleStageChange}
          handleFinish={finishAdventure}
        />
      </div>

      {/* StageRequirements
        <StageRequirements />
          StageRequirements ends */}

      <div className="mt-4">
        <MissionsList shownStage={shownStage} />
      </div>
      <ConfirmationModal
        title="¿Estás seguro de terminar la aventura?"
        description={
          <span>
            Esta aventura se terminará y los puntajes de l@s estudiantes
            volverán a 0. Podrás escoger una nueva aventura si lo deseas.
          </span>
        }
        open={openConfirmation}
        confirmText="Sí, terminar"
        callBackFunction={cancelAdventure}
        onClose={() => setOpenConfirmation(false)}
      />
    </AdventureContainer>
  );
};

const AdventureWithProvider: React.FC<AdventureWithProviderProps> = ({
  adventure,
  missions,
  students,
  handleUpdateCurrentAdventure,
  updateStageData,
}) => (
  <AdventureProvider
    adventure={adventure}
    missions={missions}
    students={students}
    handleUpdateCurrentAdventure={handleUpdateCurrentAdventure}
    updateStageData={updateStageData}
  >
    <Adventure />
  </AdventureProvider>
);

export default AdventureWithProvider;
