import styled from "styled-components";
import { Box, Card } from "@mui/material";

export const ForgotPasswordContainer = styled(Box)`
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const ForgotPasswordCard = styled(Card)`
  border-radius: 8px;
  min-width: 160px;
  max-width: 500px;
  width: 100%;
  overflow: auto !important;

  .MuiCardMedia-root {
    background: ${(props) => props.theme.palette.primary.main};
  }

  .MuiButton-startIcon .MuiSvgIcon-root {
    font-size: 14px;
  }
`;
