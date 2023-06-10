import React, { useState, useEffect } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { GoalSelectionContainer, CardContainer, ImgContainer } from './styled';
import { AxiosResponse } from 'axios';
import { getGoals } from 'services/goals';
import { FetchStatus } from 'global/enums';
import { IGoal } from 'global/interfaces';
import { useClassContext } from 'routes/Class/context';

const GoalSelection: React.FC = () => {
  const { classDetails, loadingClass } = useClassContext();
  const navigate = useNavigate();
  const [goals, setGoals] = useState<IGoal[]>([]);
  const [selectedGoalId, setSelectedGoalId] = useState<number>(null);
  const [loadingGoals, setLoadingGoals] = useState<FetchStatus>(FetchStatus.Idle);

  const selectAdventure = (goalId: number) => {
    if (selectedGoalId !== goalId) setSelectedGoalId(goalId);
    else setSelectedGoalId(null);
  };

  const nextView = () => navigate('objetivo/' + selectedGoalId);

  useEffect(() => {
    setLoadingGoals(FetchStatus.Pending);
    getGoals()
      .then((response: AxiosResponse) => response?.data)
      .then((goalsResponse: { responseData: any }) => {
        setGoals(goalsResponse.responseData);
        setLoadingGoals(FetchStatus.Success);
      })
      .catch((error) => {
        console.error(error);
        setLoadingGoals(FetchStatus.Error);
      });
  }, []);

  if (loadingGoals === FetchStatus.Idle || loadingGoals === FetchStatus.Pending || !classDetails)
    return (
      <div className="d-flex w-100 align-items-center justify-content-center">
        <CircularProgress />
      </div>
    );

  if (loadingClass === FetchStatus.Success && classDetails.current_adventure)
    return <Navigate to={`/app/cursos/${classDetails.id}/aventuras`} />;

  return (
    <GoalSelectionContainer className="w-100 p-5">
      <Typography variant="h4" fontWeight="bold" className="mb-4">
        Inicia una nueva aventura
      </Typography>
      <Typography variant="h5" className="mb-2">
        <b>Paso 1:</b> Escoge un objetivo
      </Typography>
      <Typography variant="body1" className="mb-4">
        Una aventura es una serie de misiones planificadas para <b>alcanzar un objetivo</b> en
        concreto con tu curso. Para empezar, <b>escoge el objetivo</b> que quieres alcanzar con el
        curso <b>{classDetails.alias}</b>.
      </Typography>
      <div className="d-flex flex-column w-100 align-items-center justify-content-between h-100">
        <div className="d-flex justify-content-center gap-3 w-100 flex-wrap">
          {goals?.length
            ? goals.map((goal: IGoal) => (
                <CardContainer
                  key={`${goal.id}-${goal.title}`}
                  className={`d-flex flex-column align-items-center position-relative ${
                    goal.id === selectedGoalId ? 'selected' : ''
                  }`}
                  onClick={() => selectAdventure(goal.id)}
                >
                  <img height={500} src={goal.image_url} width="100%" />
                  <Box className="goal-card-text py-2 px-3 d-flex align-items-center justify-content-center flex-fill">
                    <Typography
                      maxWidth="200px"
                      variant="body2"
                      component="span"
                      textAlign="center"
                      fontWeight="bold"
                    >
                      {goal.title}
                    </Typography>
                  </Box>
                </CardContainer>
              ))
            : null}
        </div>
        <Button
          className="mt-4"
          variant="contained"
          size="large"
          disabled={!selectedGoalId && selectedGoalId !== 0}
          onClick={nextView}
        >
          Continuar
        </Button>
      </div>
    </GoalSelectionContainer>
  );
};

export default GoalSelection;
