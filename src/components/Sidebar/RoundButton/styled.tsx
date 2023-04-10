import styled from "styled-components";
import Fab from "@mui/material/Fab";
import { Box } from "@mui/material";

export const RoundButton = styled(Fab)`
  && {
    font-size: 24px;
    font-weight: normal;
    width: 40px;
    height: 40px;
    box-shadow: none;
    border-radius: 100%;
  }
`;
