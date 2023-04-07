import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import type { IAdventure } from "global/interfaces";
import Toaster from "utils/Toster";
import { setCurrentAdventure } from "services/adventures";
import { useParams, useNavigate } from "react-router-dom";
import SkillPoints from "components/SkillPoints";
import EmojiFlagsIcon from '@mui/icons-material/EmojiFlags';
import { AdventureBanner } from "./styled";
import { useClassContext } from "routes/Class/context";

const AdventureSummaryDialog: React.FC<{
  selectedAdventure: IAdventure;
  handleOnCloseModal: () => void;
}> = ({ selectedAdventure, handleOnCloseModal }) => {
  const { classId } = useParams();
  const [shownAdventure, setShownAdventure] = useState<IAdventure>(undefined);
  const [sortedStages, setSortedStages] = useState([]);
  const { classDetails, setClassDetails } = useClassContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedAdventure && selectedAdventure.template_stages) {
      const newSortedStages = [...selectedAdventure.template_stages].sort((a, b) => {
        if (a._index > b._index) return 1;
        if (a._index < b._index) return -1;
        return 0;
      });      
      setSortedStages(newSortedStages);
    }
  }, [selectedAdventure]);

  useEffect(() => {
    if (selectedAdventure) setShownAdventure(selectedAdventure);
  }, [selectedAdventure]);


  const setAdventure = async () => {
    if (classId && selectedAdventure) {
      try {
        const { data } = await setCurrentAdventure({
          id_class: +classId,
          id_adventure: selectedAdventure.id,
        });
        setClassDetails({
          ...classDetails,
          current_adventure: data.responseData.currentAdventure
        })
      
        navigate(`/app/cursos/${classId}/aventuras`);
        Toaster("success", "Aventura inciciada exitosamente");
      } catch (e: any) {
        Toaster("error", e.message);
      }
    }
  };
  
  return (
    <Dialog open={!!selectedAdventure} onClose={handleOnCloseModal} fullWidth>
      <DialogTitle className="d-flex flex-column p-0">
        <AdventureBanner sx={{ backgroundImage: `url(${selectedAdventure?.banner})` }}>
          <Typography variant="h4" fontWeight="bold" className="mb-2">{shownAdventure?.title}</Typography>
          <section className="d-flex flex-column">
            <div className="d-flex flex-wrap flex-lg-nowrap gap-2">
              {!!shownAdventure?.skills?.length ? shownAdventure.skills.map((adventureSkill, index) => (
                  <SkillPoints key={`${adventureSkill.id}-${adventureSkill.title}-${index}`} skill={adventureSkill} />
              )) : null}
            </div>
          </section>
        </AdventureBanner>
      </DialogTitle>
      <DialogContent dividers className="d-flex flex-column p-0">
        <Box className="d-flex flex-column flex-fill w-100">          
          <div className="d-flex flex-column gap-3 p-4">
            <section className="d-flex flex-column">
              <Typography variant="subtitle1" fontWeight="bold">Resumen</Typography>
              <Typography variant="body1">{shownAdventure?.overview}</Typography>
            </section>
            <section className="d-flex flex-column">
              <Typography variant="subtitle1" fontWeight="bold">Resultados esperados</Typography>
              {!!shownAdventure?.expected_results.split('\n')?.length ? (
                <ul className="ps-4 mb-0">
                  {shownAdventure.expected_results.split('\n').map((expectedResult: string, i: number) => (
                    <li key={`adventure-${shownAdventure.id}-expected-result-${i}`}>{expectedResult}</li>
                  ))}
                </ul>
              ) : null}
            </section>
            <section className="d-flex flex-column gap-2">
              <Typography variant="subtitle1" fontWeight="bold">Etapas de la aventura</Typography>
              <div className="d-flex flex-column gap-2">
                {sortedStages.map((stage, i) => (
                  <div className="d-flex gap-2 align-items-center">
                    <EmojiFlagsIcon  />
                    <Typography variant="body1">
                      <b>{`Etapa ${i}: `}</b>{stage.title}
                    </Typography>
                  </div>
                ))}
              </div>
            </section>
          </div>          
        </Box>
      </DialogContent>
      <DialogActions className="d-flex align-items-center p-4">
        <Button variant={"outlined"} onClick={handleOnCloseModal}>
          Cancelar
        </Button>
        <Button variant="contained" color="primary" onClick={setAdventure}>
          Quiero esta aventura
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AdventureSummaryDialog;
