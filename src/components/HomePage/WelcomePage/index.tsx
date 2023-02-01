import type { FC } from "react";
import { Box, Button } from "@mui/material";
import styled from "styled-components";
import { WelcomePageProps } from "./interfaces";

const WelcomePage: FC<WelcomePageProps> = ({
  handleOpenModal,
}: WelcomePageProps) => {
  return (
    <WelcomePageContainer>
      <h1 className="text-center header__text">Selecciona un curso</h1>
      <p className={"description__text"}>
        Add a class to start improving our classroom environment together
      </p>
      <Button onClick={handleOpenModal} variant={"contained"}>
        Add your first class
      </Button>
    </WelcomePageContainer>
  );
};
export default WelcomePage;

const WelcomePageContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-direction: column;

  & .header__text {
    font-weight: 700;
    font-size: 3rem;
  }

  & .description__text {
    font-size: 1.5rem;
    text-align: center;
    max-width: 45ch;
  }

  & button {
    border-radius: 8px;
    font-weight: 700;
    font-size: 1.5rem;
    text-transform: none;
  }
`;
