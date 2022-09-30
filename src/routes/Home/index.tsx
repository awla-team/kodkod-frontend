import React from "react";
import { Button } from "@mui/material";
import { HomeContainer } from "./styled";
import cats from "./../../assets/images/cats.png";

const Home: React.FC = () => {
  return (
    <HomeContainer className="d-flex h-100 w-100 flex-column align-items-center justify-content-center">
      <img src={cats} alt="" />
      <h1>¡Bienvenido a <span>kodkod</span>!</h1>
      <h3 className="mb-3">Completa misiones, sube de nivel y diviertete</h3>
      <div>
        <Button className="me-2" variant="contained" size="large" color="primary">
          ¿Qué es kodkod?
        </Button>        
      </div>
    </HomeContainer>
  );
};

export default Home;
