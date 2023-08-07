import { Card } from '@mui/material';
import styled, { DefaultTheme } from 'styled-components';

export interface IRewardCardElementProps {
  type: string;
}

export const CustomCard = styled(Card)`
  min-width: 240px;
  width: 240px;
  height: 360px;
  border-radius: 8px;
  position: relative;

  background: rgb(252, 238, 255);
  background: linear-gradient(
    360deg,
    rgba(252, 238, 255, 1) 0%,
    rgba(210, 210, 255, 1) 100%
  );
  border: 1px solid rgb(252, 238, 255);

  .reward-img > img {
    width: 100px;
  }

  .points-container {
    position: absolute;
    padding: 4px 16px;
    box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.1);
    background: rgb(242, 251, 250);
    background: linear-gradient(
      180deg,
      rgba(242, 251, 250, 1) 0%,
      rgba(255, 255, 255, 1) 100%
    );
    bottom: 0;
    border: 1px solid #dadada;
    border-radius: 16px 16px 0px 0px;
    border-bottom: none;

    img {
      width: 24px;
      height: 24px;
    }
  }
`;
