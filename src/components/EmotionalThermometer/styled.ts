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