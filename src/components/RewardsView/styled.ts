import styled from 'styled-components'
import {Box} from "@mui/material";

export const RewardsViewContainer= styled(Box)`
  padding: 1rem;

  & .back__navigation__container {
    display: flex;
    gap: 1rem;
    align-items: center;
    color: #000;
    font-size: 1.25rem;
    line-height: 24.2px;
  }

  & .rewards__sections {
    display: flex;
    flex-direction: column;

    & .header__text {
      font-size: 1.25rem;
      font-weight: 700;
      line-height: 2rem;
    }

    & .subheading__text {
      line-height: 1.5rem;
    }

    & .rewards__scrollable__container {
      display: flex;
      flex-wrap: nowrap;
      gap: 3.375rem;
    }
  }
`