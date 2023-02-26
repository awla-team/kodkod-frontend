import styled from "styled-components";
import { Box, Button } from "@mui/material";

export const ClimateThermometerContainer = styled(Box)`
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
`;

export const TodayReviewQuestionsContainer = styled(Box)`
  padding-block: 2.25rem;
  display: flex;
  flex-direction: column;
  gap: 2.25rem;

  & .form__label {
    font-weight: 700;
    text-align: center;
    color: inherit;
    margin-bottom: 0.5rem;
  }

  & .completed__text {
    text-align: center;
    color: #4e4e4e;
    font-size: 1.125rem;
  }

  & .again__action {
    text-align: center;
    text-decoration: underline;
    color: #4e4e4e;
    font-size: 1.125rem;
    cursor: pointer;
  }
`;

export const ActionButton = styled(Button)`
  font-weight: 700;
  border-radius: 8px;
  text-transform: none;
  font-size: 1.125rem;
`;

export const ThermometerCalendarView = styled(Box)`
  padding: 0 2.25rem 2.25rem 2.25rem;

  & .info__text {
    margin-bottom: 2.2rem;
  }

  & .calendar__container {
    & .date__text {
      text-transform: uppercase;
      margin-bottom: 0.5rem;
    }

    & .calendar__view {
      display: flex;
      flex-wrap: wrap;

      & .date__cell {
        position: relative;
        cursor: pointer;
        width: 50px;
        height: 50px;
        border: 1px solid #000;
        text-align: center;
        line-height: 50px;
        font-weight: 700;
        font-size: 1.125rem;

        & .last__check {
          width: 15px;
          height: 15px;
          position: absolute;
          right: -1px;
          top: -4px;
        }

        &:hover,
        &.current {
          background: #c9c9c9;
        }
      }
    }
  }
`;
