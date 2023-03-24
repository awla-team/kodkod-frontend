import { DetailsCardContent } from "./styled";
import { ClassDetailsCardProps } from "./interfaces";
import { FC } from "react";
import { Button, Chip, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ClassDetailsCard: FC<ClassDetailsCardProps> = ({ classDetails }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    //navigate(`/app`);
    navigate(`/app/cursos/${classDetails.id}/aventuras`);
  };
  
  return (
    <DetailsCardContent>      
      <Typography component="h2" variant="h2" fontWeight="bold" className="mb-2">{classDetails.alias}</Typography>
      <div className="mb-3">
        {classDetails.current_adventure ? (
          <div className="d-flex flex-column">
            <div className="mb-2">
              <Chip label="Aventura en curso" color="primary" variant="outlined" />
            </div>            
            <Typography component="span" variant="body1">{classDetails.current_adventure.title}</Typography>
          </div>          
        ) : (
          <div className="d-flex flex-column">
            <Typography component="span" variant="body1" fontWeight="bold" mb={1}>¡Aún no has seleccionado una aventura!</Typography>
            <Typography component="span" variant="body1">Presiona el botón a continuación para escoger una aventura que se ajuste a tus objetivos</Typography>          
          </div>          
        )}
      </div>
      <div>
        <Button variant="contained" size="large" onClick={handleNavigate}>
          {classDetails.current_adventure ? 'Continua la aventura' : 'Selecciona una aventura'}
        </Button>
      </div>
    </DetailsCardContent>
  );
};

export default ClassDetailsCard;
