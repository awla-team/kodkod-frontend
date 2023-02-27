import styled from "styled-components";
import { Box, Radio } from "@mui/material";

export const EmotionalThermometerContainer = styled(Box)`
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
`;

export const PickersDateContainer= styled(Box)`
  position: relative;

  & .tick__icon {
    text-align: center;
    background: #2FB745;
    height: 15px;
    width: 15px;
    position: absolute;
    top: -2px;
    right: -2px;
    font-size: 0.5rem;
    color: #fff;
    border-radius: 50%;
    padding: 0.1rem;
  }
`