import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import AdventureCard from "components/AdventureCard";
import type { IAdventure } from "global/interfaces";
import Point from "components/Point";
import { useLocation } from "react-router";
import { getAdventuresByGoal } from "services/adventures";
import { FetchStatus } from "global/enums";
import CircularProgress from "@mui/material/CircularProgress";
import AdventureSummaryDialog from "../components/AdventureSummaryDialog";

const AdventuresSummary: React.FC = () => {
  const { state } = useLocation();
  const { selectedGoal } = state;
  const [loading, setLoading] = useState<FetchStatus>(FetchStatus.Idle);
  const [adventures, setAdventures] = useState<IAdventure[]>([]);
  const [selectedAdventure, setSelectedAdventure] = useState<IAdventure>(null);

  const handleOnClickAdventure = (adventure: IAdventure) => {
    setSelectedAdventure(adventure);
  };

  const handleOnCloseModal = () => {
    setSelectedAdventure(null);
  };

  const handleAdventureSelection = () => {
    // TODO: post to class_has_adventure (?)
  };

  useEffect(() => {
    if (selectedGoal && Object.keys(selectedGoal).length) {
      setLoading(FetchStatus.Pending);
      getAdventuresByGoal(selectedGoal.id)
        .then(({ data }) => {
          if (!!data?.length) setAdventures(data);
          setLoading(FetchStatus.Success);
        })
        .catch((error) => {
          console.error(error);
          setLoading(FetchStatus.Error);
        });
    }
  }, [selectedGoal]);

  if (loading === FetchStatus.Idle || loading === FetchStatus.Pending)
    return (
      <div className="d-flex flex-column flex-fill w-100 h-100">
        <Typography variant="h4" fontWeight="bold" className="mb-2">
          Comienza una aventura
        </Typography>
        <Typography variant="body1" className="mb-4">
          ¡Muy bien! Ahora selecciona una de las siguientes aventuras creadas
          especificamente para <b>{selectedGoal?.title || ""}</b>
        </Typography>
        <div className="d-flex flex-fill h-100 w-100 align-items-center justify-content-center">
          <CircularProgress />
        </div>
      </div>
    );

  return (
    <div className="d-flex flex-column flex-fill w-100 h-100">
      <Typography variant="h4" fontWeight="bold" className="mb-2">
        Comienza una aventura
      </Typography>
      <Typography variant="body1" className="mb-4">
        ¡Muy bien! Ahora selecciona una de las siguientes aventuras creadas
        especificamente para <b>{selectedGoal?.title || ""}</b>
      </Typography>
      {adventures?.length ? (
        <>
          <div className="d-flex h-100 w-100 align-items-center justify-content-center justify-content-sm-start flex-wrap gap-4">
            {adventures.map((adventure, index) => (
              <AdventureCard
                onClick={() => {
                  handleOnClickAdventure(adventure);
                }}
                key={index}
                title={adventure.title}
                info={
                  <div>
                    {adventure?.adventureSkills?.map((skill, index) => (
                      <div
                        key={index}
                        className="d-flex align-items-center gap-1"
                      >
                        <span className="me-2">{skill.skill.title}</span>
                        <div className="d-flex">
                          <Point highlighted={skill.points > 0} />
                          <Point highlighted={skill.points > 1} />
                          <Point highlighted={skill.points > 2} />
                        </div>
                      </div>
                    ))}
                  </div>
                }
              />
            ))}
          </div>
          <AdventureSummaryDialog
            selectedAdventure={selectedAdventure}
            handleOnCloseModal={handleOnCloseModal}
            handleAdventureSelection={handleAdventureSelection}
          />
        </>
      ) : (
        <div className="d-flex flex-fill h-100 w-100 align-items-center justify-content-center">
          <Typography variant="h6" className="mb-2">
            No hay aventuras disponibles para este objetivo
          </Typography>
        </div>
      )}
    </div>
  );
};

export default AdventuresSummary;
