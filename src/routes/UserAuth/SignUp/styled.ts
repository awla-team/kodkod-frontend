import styled from "styled-components";
import {
  Box,
  Card,
  cardContentClasses,
  cardClasses,
  formControlClasses,
  formLabelClasses,
  inputBaseClasses,
  buttonClasses,
  selectClasses,
  outlinedInputClasses,
} from "@mui/material";

export const SignUpContainer = styled(Box)`
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const SignUpCard = styled(Card)`
  border-radius: 8px;
  width: 500px;

  .MuiCardMedia-root {
    background: ${(props) => props.theme.palette.primary.main};
  }

  .MuiButton-startIcon .MuiSvgIcon-root {
    font-size: 14px;
  }
`;

