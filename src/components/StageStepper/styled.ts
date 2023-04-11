import styled from 'styled-components';
import Stepper from '@mui/material/Stepper';

export const CustomStepper = styled(Stepper)`
  display: flex;
  gap: 8px;
  align-items: center;
  .MuiStepConnector-root {
    display: none;
  }
  .stage-step {
    transition: all 0.2s ease;
    background: lightgray;
    width: 16px;
    height: 16px;
    border-radius: 100%;
    pointer-events: none;

    &.navigable {
      background: #fff;
      border: 3px solid ${(props) => props.theme.palette.highlight.main};
      pointer-events: all;

      &.active {
        background: ${(props) => props.theme.palette.highlight.main};
        transform: scale(1.3);
      }
    }
  }
`;
