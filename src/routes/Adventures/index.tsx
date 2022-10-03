import React from "react";
import { AdventuresContainer } from "./styled";
import ViewContainer from "../../components/ViewContainer";
import SectionSubtitle from "../../components/SectionSubtitle";
import theme from "../../global/theme";

const Adventures: React.FC = () => {
  return (
    <AdventuresContainer className="container">
      <ViewContainer>
        <h2>Empieza una aventura &#128640;</h2>
        <p>Una aventura es una serie de misiones planificadas que el estudiante debe completar para desarrollar habilidades específicas. ¡Escoge una aventura y desafía a tus estudiantes!</p>
        <SectionSubtitle backgroundColor={theme.palette.primary.light} textColor="white">Habilidades cognitivas</SectionSubtitle>
        <SectionSubtitle backgroundColor={theme.palette.secondary.light} textColor="white">Habilidades socioemocionales</SectionSubtitle>
      </ViewContainer>
    </AdventuresContainer>
  );
};

export default Adventures;
