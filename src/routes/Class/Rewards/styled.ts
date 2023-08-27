import styled from 'styled-components';
import { Box } from '@mui/material';

export const RewardsBox = styled(Box)`
  border-radius: 8px;
  background-color: #fff;
  border: 1px solid rgba(33, 33, 33, 0.08);
`;

export const RewardsList = styled(Box)`
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 36px;
  margin: 24px 0;

  overflow-x: auto;

  min-height: 616px;

  border-radius: 8px;
  border: 1px solid #fa00ff;
  background: #ffebff;
`;
