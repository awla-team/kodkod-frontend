import type { FC } from "react";
import { Box, Button, Typography } from "@mui/material";
import styled from "styled-components";
import { WelcomePageProps } from "./interfaces";

const WelcomePage: FC<WelcomePageProps> = ({
  handleOpenModal,
}: WelcomePageProps) => {
  return (
    <div className="w-100 d-flex align-items-center justify-content-center p-5">
      <WelcomePageContainer className="p-5">
        <img className="mb-5" />
        <div> 
          <Typography component="h1" variant="h5" className="fw-bold text-center mb-3">¡Vamos a añadir tus cursos!</Typography>
          <Typography component="div" variant="body1" className="mb-4">
            En tus cursos, podrás escoger divertidas aventuras para trabajar en el desarrollo socioemocional de tus estudiantes.
          </Typography>
          <Button onClick={handleOpenModal} variant={"contained"} className="w-100">
            Añade tu primer curso
          </Button>       
        </div>      
      </WelcomePageContainer>
    </div>    
  );
};
export default WelcomePage;

const WelcomePageContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;  
  flex-direction: column;
  background-color: #FFF;
  border-radius: 8px;
  width: 420px;  
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0.08);

  img {
    border: 1px solid lightgray;
    border-radius: 8px;
    width: 100%;
    height: 250px;
  }
`;
