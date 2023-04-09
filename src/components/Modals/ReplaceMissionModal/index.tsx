import { FC, useState, useContext, useEffect } from "react";
import { ReplaceMissionModalProps } from "./interfaces";
import { NewMissionList } from "./styled";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import MissionCard from "../../MissionCard";
import { difficultyIcons, difficultyToText } from "utils";
import Toaster from "utils/Toster";
import { getMissionsByStage, updateStageMission } from "services/missions";
import { IMission } from "../../../global/interfaces";
import { AdventureContext } from "../../../routes/Class/Adventures/Adventure/provider";
import { Box } from "@mui/system";

const ReplaceMissionModal: FC<ReplaceMissionModalProps> = ({
  open,
  onClose,
  mission,
  stage,
}) => {
  const [selected, setSelected] = useState<null | IMission>(null);
  const [pending, setPending] = useState<boolean>(false);
  const [missions, setMissions] = useState<IMission[]>([]);
  const { updateStageData } = useContext(AdventureContext);

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
      const sorted = data.responseData.sort((a, b) => {
        if (a.title > b.title) return 1;
        if (a.title < b.title) return -1;
        return 0;
      });
      const filtered = sorted.filter((_mission) => _mission.id !== mission.id);
      setMissions(filtered);
    } catch (error: any) {
      console.error(error);
      Toaster("error", "Hubo un error al obtener las misiones");
    }
  };

  const handleSelection = (mission: IMission) => {
    if (mission?.id === selected?.id) setSelected(null);
    else setSelected(mission);
  };

  const handleClick = async () => {
    try {
      setPending(true);
      const index = stage.missions.indexOf(mission);
      const missionsCopy = [...stage.missions];
      const body = {
        id_stage: stage.id,
        new_mission_id: selected.id as number,
        old_mission_id: mission.id as number,
      };
      await updateStageMission(body);
      missionsCopy[index] = selected;
      updateStageData({
        ...stage,
        missions: missionsCopy,
      });
      Toaster("success", "Misión reemplazada exitosamente");
      onClose();
    } catch (error: any) {
      console.error(error);
      Toaster("error", "Hubo un error al reemplazar la misión");
    } finally {
      setPending(false);
    }
  };
  return (
    <Dialog
      open={open}
      onClose={(event, reason) => onClose(reason)}
      scroll={"body"}
      PaperProps={{ className: "p-3" }}
    >
      <DialogTitle fontWeight="bold">{`Reemplazar misión "${mission.title}"`}</DialogTitle>
      <DialogContent>
        <div className="mb-3">
          <Typography component="span" variant="body1">
            Cambia esta misión por otra de la misma <b>habilidad</b> y{" "}
            <b>dificultad</b>. Recuerda que no puedes reemplazar una misión que
            ya ha sido completada por algún estudiante.
          </Typography>
        </div>
        <NewMissionList className="mt-2">
          <Box
            className="d-flex align-items-center justify-content-center p-3"
            sx={{ boxShadow: "0 0 2px rgba(33, 33, 33, 0.5);" }}
          >
            <Typography component="span" variant="body2" className="me-2">
              Mostrando misiones de
            </Typography>
            <div className="d-flex align-items-center justify-content-center gap-1 me-2">
              <div
                style={{
                  borderRadius: "100%",
                  height: "12px",
                  width: "12px",
                  background: "#bdbdbd",
                }}
              />
              <Typography component="span" variant="body2" fontWeight="bold">
                {mission?.skill?.title}
              </Typography>
            </div>
            <Typography component="span" variant="body2" className="me-1">
              de dificultad
            </Typography>
            <div className="d-flex align-items-center">
              {difficultyIcons[mission.difficulty]}
              <Typography component="span" variant="body2" fontWeight="bold">
                {difficultyToText(mission.difficulty)}
              </Typography>
            </div>
          </Box>
          <Box
            className="d-flex flex-column gap-3 p-4"
            sx={{ height: "400px", overflow: "auto", marginTop: "1px" }}
          >
            {missions.length ? (
              missions.map((res, index) => (
                <div key={`new-mission-${index}`}>
                  <MissionCard
                    onClick={() => handleSelection(res)}
                    selected={res.id === selected?.id}
                    mission={res}
                  />
                </div>
              ))
            ) : (
              <div className="d-flex align-items-center justify-content-center h-100">
                <Typography
                  component="span"
                  variant="subtitle1"
                  color="#bdbdbd"
                >
                  No hay misiones disponibles para reemplazar
                </Typography>
              </div>
            )}
          </Box>
        </NewMissionList>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => onClose("escapeKeyDown")}>
          Cancelar
        </Button>
        <Button
          variant={"contained"}
          onClick={handleClick}
          disabled={pending || !selected}
        >
          Cambiar misión
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ReplaceMissionModal;
