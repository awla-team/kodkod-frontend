import styled from "styled-components";
import {Box} from "@mui/material";

export const ClimateThermometerContainer= styled(Box)`
  & .header__text {
    font-weight: 700;
    text-align: center;
    margin-bottom: 0.5rem;
  }

  & .thermometer__container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    & .meter {
      width: 36px;
      height: 36px;
      cursor: pointer;
    }
  }
`