import { Typography } from "@mui/material";
import MissionCard from "components/MissionCard";
import StageIcon from "components/StageIcon";
import { IMission, IStage } from "global/interfaces";
import React, { useContext, useState, useEffect, Fragment } from "react";
import { getMissionsByStage } from "services/missions";
import { AdventureContext } from "../provider";
import { IMissionsByStage } from "./interfaces";
import { MissionDialog, MissionsListContainer, StagesStepper } from "./styled";

const MissionsTab: React.FC = () => {
  const { adventure } = useContext(AdventureContext);
  const [shownStage, setShownStage] = useState<IStage | undefined>(
    adventure?.stages ? adventure?.stages[0] : undefined
  );
  const [missionsByStage, setMissionsByStage] = useState<IMissionsByStage>({});
  const [selectedMission, setSelectedMission] = useState<IMission | undefined>(
    undefined
  );

  useEffect(() => {
    if (shownStage && !missionsByStage[shownStage.id]) {
      getMissionsByStage({ id: shownStage.id })
        .then(({ data }) =>
          setMissionsByStage((missionsByStage) => ({
            ...missionsByStage,
            [shownStage.id]: data,
          }))
        )
        .catch((e) => console.log(e));
    }
  }, [shownStage]);

  const handleStageChange = (stage: IStage) => setShownStage(stage);
  const handleSelectMission = (mission: IMission | undefined) =>
    setSelectedMission(mission);

  return (
    <MissionsListContainer>
      {adventure?.stages && shownStage ? (
        <div>
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <div className="d-flex align-items-center">
                <div className="me-3">
                  <StageIcon selected icon={shownStage.icon} />
                </div>
                <div className="d-flex flex-column justify-content-center">
                  <Typography className="me-2">{`Etapa ${shownStage._index}`}</Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {shownStage.title}
                  </Typography>
                </div>
              </div>
            </div>
            <div className="d-flex">
              {adventure?.stages?.map((stage, i) => (
                <Fragment key={`${adventure.id}-${stage.id}`}>
                  <StagesStepper
                    className="d-flex flex-column align-items-center"
                    role="button"
                    onClick={() => handleStageChange(stage)}
                  >
                    <StageIcon
                      icon={stage.icon}
                      selected={shownStage.id === stage.id}
                    />
                    <Typography
                      variant="caption"
                      className="mt-1"
                    >{`Etapa ${stage._index}`}</Typography>
                  </StagesStepper>
                  {adventure?.stages && i < adventure?.stages?.length - 1 ? (
                    <hr />
                  ) : null}
                </Fragment>
              ))}
            </div>
          </div>
          <Typography fontWeight="bold" className="ms-5 mt-4">
            Los códigos QR no se muestran en el modo de previsualización. Apreta
            el botón "Iniciar Aventura" para trabajar las misiones con tus
            estudiantes.
          </Typography>
          <div className="d-flex flex-wrap justify-content-center mt-2 px-5">
            {missionsByStage[shownStage.id]?.map((mission) => (
              <div
                className="col-6 p-2"
                role="button"
                onClick={() => handleSelectMission(mission)}
              >
                <MissionCard mission={mission} />
              </div>
            ))}
          </div>
          <MissionDialog
            PaperProps={{ sx: { borderRadius: 2, overflow: "visible" } }}
            open={!!selectedMission}
            onClose={() => handleSelectMission(undefined)}
          >
            {selectedMission ? (
              <MissionCard
                mission={selectedMission}
              />
            ) : null}
          </MissionDialog>
        </div>
      ) : null}
    </MissionsListContainer>
  );
};

export default MissionsTab;
