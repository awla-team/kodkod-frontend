import { AdventureBanner, DetailsCardContent } from "./styled";
import { ClassDetailsCardProps } from "./interfaces";
import { FC } from "react";
import { Button, Chip, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SkillPoints from "components/SkillPoints";

const ClassDetailsCard: FC<ClassDetailsCardProps> = ({ classDetails }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {    
    navigate(`/app/cursos/${classDetails.id}/aventuras`);
  };
  
  return (
    <DetailsCardContent>      
      <Typography component="h2" variant="h2" fontWeight="bold" className="mb-2">{classDetails.alias}</Typography>
      <Typography component="span" variant="body1" className="mb-2">Tienes una aventura en curso:</Typography>
      <div className="mb-3">
        {classDetails.current_adventure ? (
          <div>            
            <Typography variant="h5" fontWeight="bold" className="mb-2">{classDetails.current_adventure?.title}</Typography>
            <section className="d-flex flex-column">
              <div className="d-flex flex-wrap flex-lg-nowrap gap-3">
                {!!classDetails.current_adventure?.skills?.length ? classDetails.current_adventure.skills.map((adventureSkill, index) => (
                    <SkillPoints key={`${adventureSkill.id}-${adventureSkill.title}-${index}`} skill={adventureSkill} />
                )) : null}
              </div>
            </section>
            <div className="mt-3">
              <Button variant="contained" size="large" onClick={handleNavigate}>Continuar aventura</Button>
            </div>            
          </div>
        ) : (
          <div className="d-flex flex-column">
            <Typography component="span" variant="body1" fontWeight="bold" mb={1}>¡Aún no has seleccionado una aventura!</Typography>
            <Typography component="span" variant="body1">Presiona el botón a continuación para escoger una aventura que se ajuste a tus objetivos</Typography>
            <div>
              <Button variant="contained" size="large" onClick={handleNavigate}>Selecciona una aventura</Button>
            </div>
          </div>          
        )}
      </div>
    </DetailsCardContent>
  );
};

export default ClassDetailsCard;
