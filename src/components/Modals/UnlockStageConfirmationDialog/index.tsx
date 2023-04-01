import { FC } from "react";
import { UnlockStageConfirmationDialogProps } from "./interfaces";
import { Button, Typography, DialogTitle, DialogActions, DialogContent, Dialog } from "@mui/material";

const UnlockStageConfirmationDialog: FC<UnlockStageConfirmationDialogProps> = ({
  open,
  handleClose,
  onConfirm,
  isLoading,
  unlockableStageData,
}) => {
  return (
    <Dialog
      PaperProps={{ className: "p-3" }}
      open={open}
      disableEscapeKeyDown
      onClose={handleClose}
    >
      <DialogTitle fontWeight="bold">
        Desbloquear etapa {unlockableStageData?._index}
      </DialogTitle>
      <DialogContent dividers className="py-4">
        <div className="d-flex flex-column gap-2">
          <Typography component="span" variant="body1">Tu clase está a punto de avanzar a:</Typography>
          <Typography component="span" variant="h6" textAlign="center" className="mb-2"><b>{`Etapa ${unlockableStageData._index}: `}</b>{unlockableStageData.title}</Typography>
        </div>
        <Typography component="p" variant="body1" className="mb-4">
          Desbloquear una nueva etapa significa que el curso ha trabajado duro
          y está listo para descubrir nuevos desafíos y misiones. <b>¡Muy buen trabajo!</b>
        </Typography>
        <Typography component="h6" variant="subtitle1" fontWeight="bold" className="mb-1">¿Qué sucederá al desbloquear la siguiente etapa?</Typography>
        <ul>
          <li>
            Verán <b>nuevas misiones</b>, las que les permitirán sumar más puntos.
          </li>
          <li>
            Con estos puntos podrás acceder a <b>más recompensas.</b>
          </li>
          <li>Las misiones de las etapas anteriores seguirán disponibles para quienes aún no las hayan completado.</li>
        </ul>

        <Typography textAlign="center" variant="h6" fontWeight="bold">
          ¿Están listos para seguir avanzando?
        </Typography>
      </DialogContent>
      <DialogActions className="d-flex align-items-center mt-3">
        <Button variant={"outlined"} onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant={"contained"} disabled={isLoading} onClick={onConfirm}>
          Desbloquear etapa {unlockableStageData?._index}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UnlockStageConfirmationDialog;
