import styled from 'styled-components'
import {Box} from "@mui/material";

export const MissionContainer = styled(Box)`
  margin-block: 1rem;

  & .section__heading {
    margin-block: 1rem;
    font-size: 1.5rem;
    font-weight: 700;
  }

  & .mission__content__container {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;

    & > .mission-card {
      max-width: calc(50% - 1rem);
      flex-basis: calc(50% - 1rem);
      min-height: 206px;
    }
  }
`