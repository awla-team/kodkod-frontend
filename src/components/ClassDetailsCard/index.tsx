import { DetailsCardContent } from "./styled";
import { ClassDetailsCardProps } from "./interfaces";
import { FC, useMemo } from "react";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ClassDetailsCard: FC<ClassDetailsCardProps> = ({ classDetails }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/cursos/${classDetails.id}/aventuras`);
  };

  const hasAdventure: boolean = useMemo(() => {
    return classDetails && !!classDetails.adventures?.length;
  }, [classDetails]);
  return (
    <DetailsCardContent>      
      <Typography component="h2" variant="h2" fontWeight="bold" className="mb-2">{classDetails.alias}</Typography>
      <div className="mb-3">
        <Typography component="span" variant="body1">Empieza una aventura con tus estudiantes para mejorar el ambiente de tu sala de clases.</Typography>
      </div>
      <div>
        <Button variant="contained" size="large" onClick={handleNavigate}>
          Selecciona una aventura
        </Button>
      </div>
    </DetailsCardContent>
  );
};

export default ClassDetailsCard;
