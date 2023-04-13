import { Box } from '@mui/material';
import styled from 'styled-components';

export const RewardsList = styled(Box)`
  &.inactive-rewards {
    .reward-icon {
      opacity: 0.3;
    }

    .disabled {
      pointer-events: none;
    }
  }
`;

export const RewardIcon = styled(Box)`
  display: flex;
  padding: 12px;
  background: #fff;
  border: 1px solid #dadada;
  border-radius: 100%;
  height: 64px;
  width: 64px;
  transition: background 0.5s ease;

  &.selected {
    background: #2afa81;
    border-color: #2afa81;
  }
`;
