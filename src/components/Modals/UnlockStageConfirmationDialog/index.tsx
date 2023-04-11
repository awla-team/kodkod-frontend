import { FC } from "react";
import { UnlockStageConfirmationDialogProps } from "./interfaces";
import {
  Button,
  Typography,
  DialogTitle,
  DialogActions,
  DialogContent,
  Dialog,
} from "@mui/material";

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
      {unlockableStageData ? (
        <div>
          <DialogTitle fontWeight="bold">
            Desbloquear Etapa {unlockableStageData?._index}: {unlockableStageData.title}
          </DialogTitle>
          <DialogContent dividers className="py-4">
            <Typography component="p" variant="body1" className="mb-3">
              Desbloquear una nueva etapa significa que el curso ha trabajado
              muy duro. ¡Muy buen trabajo! En la próxima etapa les esperan nuevas misiones, desafíos y recompensas.
            </Typography>
            <Typography textAlign="center" variant="h6" fontWeight="bold">
              ¡Buena suerte!
            </Typography>
          </DialogContent>
          <DialogActions className="d-flex align-items-center mt-3">
            <Button variant={"outlined"} onClick={handleClose}>
              Cancelar
            </Button>
            <Button
              variant={"contained"}
              disabled={isLoading}
              onClick={onConfirm}
            >
              Desbloquear etapa {unlockableStageData?._index}
            </Button>
          </DialogActions>
        </div>
      ) : (
        <div>
          <DialogTitle fontWeight="bold">Finalizar aventura</DialogTitle>
          <DialogContent dividers className="py-4">
            <div className="mb-3">
              <Typography component="span" variant="body1">
                Esta fue la última etapa. ¡Felicitaciones a todas y todos por su gran esfuerzo!
              </Typography>
            </div>
          </DialogContent>
          <DialogActions className="d-flex align-items-center mt-3">
            <Button variant={"outlined"} onClick={handleClose}>
              Cancelar
            </Button>
            <Button
              variant={"contained"}
              disabled={isLoading}
              onClick={onConfirm}
            >
              Finalizar aventura
            </Button>
          </DialogActions>
        </div>
      )}
    </Dialog>
  );
};

export default UnlockStageConfirmationDialog;
