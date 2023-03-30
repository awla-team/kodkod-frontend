import React, { FC, useState, useContext, useEffect } from "react";
import { ReplaceMissionModalProps } from "./interfaces";
import * as Styled from "./styled";
import CloseIcon from "@mui/icons-material/Close";
import { Button, IconButton, Typography } from "@mui/material";
import MissionCard, { Chip } from "../../MissionCard";
import { putDifficultyClass } from "utils";
import Toaster from "utils/Toster";
import { getMissionsByStage, updateStageMission } from "services/missions";
import { IMission } from "../../../global/interfaces";
import { AdventureContext } from "../../../routes/Class/Adventures/Adventure/provider";

const ReplaceMissionModal: FC<ReplaceMissionModalProps> = ({
  open,
  onClose,
  mission,
  stage,
}) => {
  const [selected, setSelected] = useState<null | IMission>(null);
  const [pending, setPending] = useState<boolean>(false);
  const [missions, setMissions] = useState<IMission[]>([]);
  const { handleUpdateCurrentAdventure } = useContext(AdventureContext);

  useEffect(() => {
    if (mission) {
      handleGetMission();
    }
  }, [mission]);

  const handleGetMission = async () => {
    try {
      const { data }: { data: { responseData: IMission[] } } =
        await getMissionsByStage({
          id_skill: mission.id_skill,
          difficulty: mission.difficulty,
        });
      setMissions(
        data.responseData.filter((_mission) => _mission.id !== mission.id)
      );
    } catch (e: any) {
      Toaster("error", e.message);
    }
  };

  const handleClick = async () => {
    try {
      setPending(true);

      const body = {
        id_stage: stage.id,
        new_mission_id: selected.id as number,
        old_mission_id: mission.id as number,
      };
      await updateStageMission(body);
      handleUpdateCurrentAdventure(selected, body);
      onClose();
    } catch (e: any) {
      Toaster("error", e.message);
    } finally {
      setPending(false);
    }
  };
  return (
    <Styled.ReplaceMissionModal
      open={open}
      onClose={(event, reason) => onClose(reason)}
      fullWidth={true}
      maxWidth={"sm"}
      scroll={"body"}
      disableEscapeKeyDown
    >
      <Styled.ReplaceMissionModalTitle>
        <div className={"close__icon__container"}>
          <IconButton color={"inherit"} onClick={() => onClose()}>
            <CloseIcon />
          </IconButton>
        </div>

        <div>
          <h1 className={"dialog__header__text"}>Change mission</h1>
          <span>
            Select a new mission to replace <b>"{mission?.title}"</b>:
          </span>
        </div>
      </Styled.ReplaceMissionModalTitle>
      <Styled.ReplaceMissionModalContent>
        <div className={"mission__card__container"}>
          <div className={"mission__detail"}>
            Missions of{" "}
            <Chip className={"variant__contained"}>
              <span className={"icon"} />
              <span>{mission?.skill?.title}</span>
            </Chip>
            of difficulty
            <Chip className={"variant__outlined"} component={"span"}>
              <span
                className={
                  "level__icon" + putDifficultyClass(mission?.difficulty)
                }
              />
              <span>{mission?.difficulty}</span>
            </Chip>
          </div>

          <div className={"mission__details_cards"}>
            <div className={"cards__view"}>
              {missions.map((res, index) => {
                return (
                  <MissionCard
                    onClick={() => setSelected(res)}
                    selected={res.id === selected?.id}
                    key={index}
                    mission={res}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </Styled.ReplaceMissionModalContent>
      <Styled.ReplaceMissionModalActions>
        <Button
          fullWidth
          variant={"contained"}
          onClick={handleClick}
          disabled={pending}
        >
          Change mission
        </Button>
      </Styled.ReplaceMissionModalActions>
    </Styled.ReplaceMissionModal>
  );
};
export default ReplaceMissionModal;
