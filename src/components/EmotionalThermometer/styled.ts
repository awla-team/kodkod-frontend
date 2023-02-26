import styled from "styled-components";
import { Box, Radio } from "@mui/material";
export const EmotionalThermometerContainer = styled(Box)`
  & .container__header {
    display: flex;    
    justify-content: space-between;
    align-items: center;

    & .calender__icon {
      color: #000;

      & .back__arrow {
        transform: translateX(-5px);
        width: 24px;
        height: 24px;
      }

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
    border-radius: 8px;
    color: #ffffff;
  }

  & .thermometer__content {
    padding: 2.25rem;
  }

  form.disabled {
    label {
      opacity: 0.6;
    }
  }  
`;

export const EmojiRadio = styled(Radio)`
  svg {
    width: 32px;
    height: 32px;
    fill: white;    
  }
`;

export const EmotionalThermometerActions = styled.div`
  height: 54px;
`
