import styled from "styled-components";
import Fab from "@mui/material/Fab";

export const AddCourseButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 16px 0px;
`;

export const AddCourseButton = styled(Fab)`
  && {
    color: ${(props) => props.theme.palette.secondary.contrastText};
    font-size: 24px;
    font-weight: normal;
    min-height: 56px;
  }
`;
