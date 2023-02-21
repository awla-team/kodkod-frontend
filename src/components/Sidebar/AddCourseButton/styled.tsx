import styled from "styled-components";
import Fab from "@mui/material/Fab";
import {Box} from "@mui/material";

export const AddCourseButtonContainer = styled(Box)`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const AddCourseButton = styled(Fab)`
  && {
    color: ${(props) => props.theme.palette.secondary.contrastText};
    font-size: 24px;
    font-weight: normal;
    min-height: 56px;
    box-shadow: none;
  }
`;
