import React, { useState, useEffect } from "react";
import { Button, CircularProgress, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CardContainer, ImgContainer } from "./styled";
import { AxiosResponse } from "axios";
import { getGoals } from "services/goals";
import { FetchStatus } from "global/enums";
import { Goal } from "services/goals/interfaces";

const GoalSelection: React.FC = () => {
  const navigate = useNavigate();
  const className = "3°C";
  const [goals, setGoals] = useState<Goal[]>([]);
  const [selectedGoalId, setSelectedGoalId] = useState<number>(null);
  const [loadingGoals, setLoadingGoals] = useState<FetchStatus>(
    FetchStatus.Idle
  );

  const handleGoalSelection = (goalId: number) => {
    if (selectedGoalId !== goalId) setSelectedGoalId(goalId);
    else setSelectedGoalId(null);
  };

  const handleGoalSelectionSave = () => {
    // TODO: patch to adventure to asociate goal
    navigate("summary", {
      replace: true,
      state: { selectedGoal: goals.find((goal) => goal.id === selectedGoalId) },
    });
  };

  useEffect(() => {
    setLoadingGoals(FetchStatus.Pending);
    getGoals()
      .then((response: AxiosResponse) => response?.data)
      .then((goalsResponse: Goal[]) => {
        if (goalsResponse?.length) setGoals(goalsResponse);
        setLoadingGoals(FetchStatus.Success);
      })
      .catch((error) => {
        console.error(error);
        setLoadingGoals(FetchStatus.Error);
      });
  }, []);

  if (loadingGoals === FetchStatus.Idle || loadingGoals === FetchStatus.Pending)
    return (
      <div className="d-flex w-100 align-items-center justify-content-center">
        <CircularProgress />
      </div>
    );

  return (
    <div className="d-flex flex-column flex-fill w-100 h-100">
      <Typography variant="h4" fontWeight="bold" className="mb-2">
        Escoge un objetivo
      </Typography>
      <Typography variant="body1" className="mb-4">
        Una aventura es una serie de misiones planificadas para alcanzar un
        objetivo con tu curso. Para empezar, <b>escoge el objetivo</b> que
        quieres alcanzar con el curso <b>{className}</b>.
      </Typography>
      <div className="d-flex flex-column w-100 align-items-center justify-content-between h-100 gap-4">
        <div className="d-flex align-items-center justify-content-center gap-4 w-100 flex-wrap">
          {goals?.length
            ? goals.map((goal: Goal) => (
                <CardContainer
                  key={`${goal.id}-${goal.title}`}
                  className={`d-flex flex-column align-items-center justify-content-between gap-2 ${
                    goal.id === selectedGoalId ? "selected" : ""
                  }`}
                  onClick={() => handleGoalSelection(goal.id)}
                >
                  <ImgContainer></ImgContainer>
                  <Typography
                    variant="body2"
                    textAlign="center"
                    fontWeight={goal.id === selectedGoalId ? "bold" : "normal"}
                  >
                    {goal.title}
                  </Typography>
                </CardContainer>
              ))
            : null}
        </div>
        <Button
          variant="contained"
          disabled={!(selectedGoalId >= 0)}
          onClick={handleGoalSelectionSave}
        >
          Continuar
        </Button>
      </div>
    </div>
  );
};

export default GoalSelection;
