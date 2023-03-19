import { DetailsCardContent } from "./styled";
import { ClassDetailsCardProps } from "./interfaces";
import { FC } from "react";
import { Button, Chip, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ClassDetailsCard: FC<ClassDetailsCardProps> = ({ classDetails }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`cursos/${classDetails.id}/aventuras`);
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
          <Typography component="span" variant="body1">Empieza una aventura con tus estudiantes para mejorar el ambiente de tu sala de clases.</Typography>
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
