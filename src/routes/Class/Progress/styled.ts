import styled from "styled-components";
import {
  Box,
  Table,
  TableContainer,
  tableHeadClasses,
  tableCellClasses,
  tableBodyClasses,
} from "@mui/material";

export const ProgressContainer = styled(Box)`
  & .title__section {
    margin-block-end: 1rem;

    & .title__heading {
      font-size: 2.25rem;
    }
  }
`;

export const KPICardContainer = styled(Box)`
  display: flex;
  gap: 2rem;
  margin-block: 1rem;

  & .rewards__obtained,
  & .completed__missions {
    max-width: 30%;
    flex-basis: 30%;
  }

  & .finished__adventures {
    max-width: 40%;
    flex-basis: 40%;
  }
`;
export const KPICard = styled(Box)`
  padding: 2rem;
  border: 1px solid #000;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  & .count {
    font-size: 3rem;
    font-weight: 700;
  }

  & .text {
    font-size: 1.5rem;
  }
`;

export const ClassLeaderboardContainer = styled(TableContainer)`
  border: 1px solid #000;
  border-radius: 8px;
  padding: 1rem;
`;

export const ClassLeaderboardTable = styled(Table)`
  & .${tableCellClasses.root} {
    border: none;
  }

  & .${tableHeadClasses.root} {
    & .${tableCellClasses.root} {
      font-weight: 700;
      background: transparent;
    }
  }

  & .${tableBodyClasses.root} {
    & td.available__rewards > .reward__points__container {
      display: flex;
      gap: 10px;
      align-items: center;

      & .reward__point {
        width: 29px;
        height: 29px;
        background: #D9D9D9;
        border-radius: 50%;
        cursor: pointer;

        &.available {
          background: #000;
        }
      }
    }
  }
`;
