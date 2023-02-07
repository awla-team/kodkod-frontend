import styled from "styled-components";
import { Box, Button } from "@mui/material";

export const EmotionalThermometerContainer = styled(Box).withConfig({
  shouldForwardProp: (prop, defaultValidatorFn) =>
    !["calenderView"].includes(prop) && defaultValidatorFn(prop),
})<{ calenderView?: boolean }>`
  & .container__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 2.25rem;

    & .container__header__text {
      flex-grow: 1;

      & .header__container {
        display: flex;
        align-items: center;
        gap: 0.5rem;

        & .header__text {
          font-weight: 700;
          font-size: 1.25rem;
        }
      }

      & .header__date {
      }
    }

    & .calender__icon {
      border-radius: 50%;
      width: 44px;
      height: 44px;
      box-shadow: -2px 3px 4px rgba(0, 0, 0, 0.25);
      background: ${({calenderView}) =>
          calenderView ? "" : 'url("/calender.svg")'} #ffffff center no-repeat;
      background-size: 24px 24px;
      border: none;
      outline: none;
      font-weight: 700;
    }
  }

  & .helper__text {
    background: #7e7e7e;
    padding: 0.625rem;
    font-weight: 700;
    text-align: center;
    color: #ffffff;
  }

  & .thermometer__content {
    padding: 2.25rem;
  }
`;
