import styled from "styled-components";
import { Box, Card } from "@mui/material";

export const SignInContainer = styled(Box)`  
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const SignInCard = styled(Card)`
  width: 500px;
  border-radius: 8px;

  .MuiCardMedia-root {
    background: ${(props) => props.theme.palette.primary.main};
  }
`;
