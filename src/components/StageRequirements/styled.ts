import styled from 'styled-components';
import { Box } from '@mui/material';
import {
  default as MuiLinearProgress,
  linearProgressClasses,
} from '@mui/material/LinearProgress';

export const StageRequirementsContainer = styled(Box)`
  margin-block: 1rem;
  padding: 0.75rem;
  border: 1px solid #000;
  border-radius: 8px;
  min-height: 200px;

  & .header__title {
    font-weight: 700;
    font-size: 16px;
    line-height: 20px;
  }

  & .stage__progress__container {
    & .stage__requirement {
      margin-block-start: 0.5rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      & .stage__requirement__name {
        line-height: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
`;

export const LinearProgress = styled(MuiLinearProgress)`
  height: 14px;
  border-radius: 8px;
  border: 1px solid #000;
  background: white;
  & .${linearProgressClasses.bar} {
    background: #9a9a9a;
    border-radius: 8px;
  }
`;
