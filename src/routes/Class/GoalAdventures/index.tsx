import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import AdventureCard from 'components/AdventureCard';
import type { IAdventure } from 'global/interfaces';
import { FetchStatus } from 'global/enums';
import CircularProgress from '@mui/material/CircularProgress';
import AdventureSummaryDialog from '../../../components/Modals/AdventureSummaryDialog';
import { Navigate, useParams, Link as RouterLink } from 'react-router-dom';
import { getGoalById } from 'services/goals';
import { GoalType } from '../Adventures/interfaces';
import Toaster from '../../../utils/Toster';
import { AdventureSelectionContainer } from './styled';
import { useClassContext } from '../context';
import SkillPoints from 'components/SkillPoints';
import { getClassHasAdventuresByClass } from 'services/classes';
import { Button } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useAuth } from 'contexts/AuthContext';
import { useOnboarding } from 'contexts/OnboardingContext';
import AdventureSelectionOnboarding from 'utils/Onboardings/AdventureSelectionOnboarding';
import FlagIcon from '@mui/icons-material/Flag';
import { Link } from 'react-router-dom';

const GoalAdventures: React.FC = () => {
  const [loading, setLoading] = useState<FetchStatus>(FetchStatus.Idle);
  const { classDetails, loadingClass } = useClassContext();
  const { setNewAvailableTours } = useOnboarding();
  const { user } = useAuth();
  const [selectedAdventure, setSelectedAdventure] = useState<IAdventure>(null);
  const [selectedGoal, setSelectedGoal] = useState<null | GoalType>(null);
  const [sortedAdventures, setSortedAdventures] = useState<IAdventure[]>([]);
  const params = useParams();

  const handleOnClickAdventure = (adventure: IAdventure) =>
    setSelectedAdventure(adventure);

  const handleOnCloseModal = () => {
    setSelectedAdventure(null);
  };

  useEffect(() => {
    setNewAvailableTours([
      {
        name: 'Selección de aventura',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        steps: AdventureSelectionOnboarding,
      },
    ]);
  }, []);

  useEffect(() => {
    if (selectedGoal?.adventures?.length) {
      const newSortedAdventures = selectedGoal.adventures.sort((a, b) => {
        if (a.title > b.title) return 1;
        if (a.title < b.title) return -1;
        return 0;
      });

      setSortedAdventures(newSortedAdventures);
    }
  }, [selectedGoal]);

  useEffect(() => {
    const id = params.goalId;
    if (id) {
      setLoading(FetchStatus.Pending);
      getGoalById(id)
        .then(({ data }: { data: { responseData: GoalType } }) => {
          setSelectedGoal(data.responseData);
          setLoading(FetchStatus.Success);
        })
        .catch((error: any) => {
          console.error(error);
          Toaster('error', 'Hubo un error al cargar el objetivo');
          setLoading(FetchStatus.Error);
        });
    }
  }, [params]);

  if (loading === FetchStatus.Idle || loading === FetchStatus.Pending)
    return (
      <div className='d-flex flex-column flex-fill w-100 h-100'>
        <div className='d-flex flex-fill h-100 w-100 align-items-center justify-content-center'>
          <CircularProgress />
        </div>
      </div>
    );

  if (loadingClass === FetchStatus.Success && classDetails.current_adventure)
    return <Navigate to={`/app/cursos/${classDetails.id}/aventuras`} />;

  return (
    <AdventureSelectionContainer className='w-100 p-5'>
      <div className='d-flex justify-content-between align-items-center'>
        <Typography variant='h4' fontWeight='bold' className='mb-4'>
          Inicia una nueva aventura
        </Typography>
        <div>
          <Button
            component={Link}
            to={`/app/cursos/${classDetails.id}/aventuras/completed`}
            variant='outlined'
            startIcon={<FlagIcon />}
          >
            Ver aventuras finalizadas
          </Button>
        </div>
      </div>
      <div>
        <Button
          id='adventure-selection-back'
          className='mb-1'
          component={RouterLink}
          to={`/app/cursos/${classDetails?.id}/aventuras/iniciar`}
          startIcon={
            <ArrowBackIosIcon
              sx={{ fontSize: '14px!important' }}
              fontSize='small'
            />
          }
        >
          Volver al paso anterior
        </Button>
      </div>
      <Typography variant='h5' className='mb-2'>
        <b>Paso 2:</b> Escoge una aventura
      </Typography>
      <Typography variant='body1' className='mb-4'>
        ¡Muy bien! Ahora selecciona una de las siguientes aventuras creadas
        especificamente para{' '}
        <b style={{ textTransform: 'lowercase' }}>
          {selectedGoal?.title || ''}
        </b>
        .
      </Typography>
      {selectedGoal && selectedGoal?.adventures?.length ? (
        <>
          <div
            id='adventure-selection-onboarding-3'
            className='d-flex h-100 w-100 align-items-center justify-content-center justify-content-center flex-wrap gap-4'
          >
            {sortedAdventures.map((adventure, index) => (
              <AdventureCard
                id={`adventure-card-${index}`}
                demo={adventure.demo || user?.is_superuser}
                onClick={() => handleOnClickAdventure(adventure)}
                key={index}
                title={adventure.title}
                img={adventure.thumbnail}
                info={
                  <div className='d-flex gap-1 flex-wrap'>
                    {!!adventure?.skills?.length
                      ? adventure.skills.map((adventureSkill, index) => (
                          <SkillPoints
                            key={`${adventureSkill.id}-${adventureSkill.title}-${index}`}
                            skill={adventureSkill}
                          />
                        ))
                      : null}
                  </div>
                }
              />
            ))}
          </div>
          <AdventureSummaryDialog
            selectedAdventure={selectedAdventure}
            handleOnCloseModal={handleOnCloseModal}
          />
        </>
      ) : (
        <div className='d-flex flex-fill h-100 w-100 align-items-center justify-content-center'>
          <Typography variant='h6' className='mb-2'>
            No hay aventuras disponibles para este objetivo
          </Typography>
        </div>
      )}
    </AdventureSelectionContainer>
  );
};

export default GoalAdventures;
