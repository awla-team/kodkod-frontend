import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SkillSummary from "../SkillSummary";
import StageSummary from "../StageSummary";
import type { IAdventure } from "global/interfaces";
import Toaster from "utils/Toster";
import { setCurrentAdventure } from "services/adventures";
import { useParams, useNavigate } from "react-router-dom";

const AdventureSummaryDialog: React.FC<{
  selectedAdventure: IAdventure;
  handleOnCloseModal: () => void;
  handleAdventureSelection: () => void;
}> = ({ selectedAdventure, handleOnCloseModal, handleAdventureSelection }) => {
  const { classId } = useParams();
  const navigate = useNavigate();
  const setAdventure = async () => {
    if (classId && selectedAdventure) {
      try {
        const { data } = await setCurrentAdventure({
          id_class: +classId,
          id_adventure: selectedAdventure.id,
        });
        navigate(`/aap/cursos/${classId}/aventuras`);
      } catch (e: any) {
        Toaster("error", e.message);
      }
    }
  };
  return (
    <Dialog
      open={!!selectedAdventure}
      onClose={handleOnCloseModal}
      sx={{
        ".MuiPaper-root": {
          maxWidth: "1000px",
          width: "100%",
          borderRadius: "8px",
        },
      }}
    >
      <IconButton
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
        }}
        onClick={handleOnCloseModal}
        size="small"
      >
        <CloseIcon />
      </IconButton>
      <DialogContent className="d-flex flex-column flex-sm-row w-100 h-100 gap-4 gap-sm-2 p-4 p-sm-5">
        <Box
          className="d-flex flex-column flex-fill w-100 gap-4"
          sx={{
            maxWidth: "600px",
          }}
        >
          <Box
            className="w-100 d-block d-sm-none"
            sx={{
              // bgcolor: "black",
              minHeight: "160px",
              borderRadius: "16px",
              backgroundColor: "gray",
              backgroundImage: `url(${
                // TODO: remove https://educacion30.b-cdn.net/wp-content/uploads/2019/02/girasoles-978x652.jpg url
                selectedAdventure?.banner ||
                "https://educacion30.b-cdn.net/wp-content/uploads/2019/02/girasoles-978x652.jpg"
              })`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          />
          <Typography variant="h4" fontWeight="bold">
            {selectedAdventure?.title || "- - -"}
          </Typography>
          <section className="d-flex flex-column gap-2">
            <Typography variant="h6" fontWeight="bold">
              Habilidades
            </Typography>
            <div className="d-flex flex-wrap flex-lg-nowrap gap-3">
              {/* TODO: remove this three SkillSummary components */}

              {!!selectedAdventure?.skills?.length
                ? selectedAdventure.skills.map((adventureSkill, index) => (
                    <SkillSummary
                      key={`${adventureSkill.id}-${adventureSkill.title}-${index}`}
                      title={adventureSkill.title}
                      points={adventureSkill.points}
                      icon={adventureSkill.icon}
                      color={adventureSkill.color}
                    />
                  ))
                : null}
            </div>
          </section>
          <section className="d-flex flex-column gap-2">
            <Typography variant="h6" fontWeight="bold">
              Resumen
            </Typography>
            <Typography variant="body1">
              {selectedAdventure?.overview}
            </Typography>
          </section>
          <section className="d-flex flex-column gap-2">
            <Typography variant="h6" fontWeight="bold">
              ¿Qué esperar al final de la aventura?
            </Typography>
            {!!selectedAdventure?.expectedResults?.length ? (
              <ul className="ps-3 mb-0">
                {selectedAdventure.expectedResults.map((expectedResult: any) => (
                  <li>{expectedResult}</li>
                ))}
              </ul>
            ) : null}
          </section>
        </Box>
        <Box
          className="d-flex flex-column flex-fill w-100 gap-4"
          sx={{
            maxWidth: "600px",
          }}
        >
          <Box
            className="w-100 d-none d-sm-block"
            sx={{
              // bgcolor: "black",
              minHeight: "160px",
              borderRadius: "16px",
              backgroundColor: "gray",
              backgroundImage: `url(${
                // TODO: remove https://educacion30.b-cdn.net/wp-content/uploads/2019/02/girasoles-978x652.jpg url
                selectedAdventure?.banner ||
                "https://educacion30.b-cdn.net/wp-content/uploads/2019/02/girasoles-978x652.jpg"
              })`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          />
          <section className="d-flex flex-column gap-2">
            <Typography variant="h6" fontWeight="bold">
              Etapas de la aventura
            </Typography>
            <div className="d-flex flex-column gap-2 align-items-center">
              {!!selectedAdventure?.template_stages?.length
                ? selectedAdventure.template_stages.map((stage, index) => (
                    <StageSummary
                      key={`${index}-${stage.id}-${stage.title}`}
                      title={stage.title}
                      description={""}
                    />
                  ))
                : null}
            </div>
          </section>
        </Box>
      </DialogContent>
      <DialogActions className="d-flex align-items-center justify-content-center">
        <Button variant="contained" color="primary" onClick={setAdventure}>
          Quiero esta aventura
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AdventureSummaryDialog;
