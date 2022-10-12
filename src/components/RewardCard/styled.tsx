import { Card } from "@mui/material";
import styled, { DefaultTheme } from "styled-components";

export interface IRewardCardElementProps {
  type: string;
};

export const RewardCardContainer = styled.div`
  .points-container {
    border: 3px solid ${(props: IRewardCardElementProps) => {
      switch (props.type) {
        case 'single':
          return '#68BBD4';
        case 'course':
          return '#F962BB';
        default:
          return '#fff';
      }
    }};
  }
  .MuiPaper-root {
    border: 1px solid ${(props: IRewardCardElementProps) => {
      switch (props.type) {
        case 'single':
          return '#68BBD4';
        case 'course':
          return '#F962BB';
        default:
          return '#fff';
      }
    }};
    background: ${(props: IRewardCardElementProps) => {
      switch (props.type) {
        case 'single':
          return '#E4F9FF';
        case 'course':
          return '#FFE1F3';
        default:
          return '#fff';
      }
    }};
  }
  text-align: center;
  flex: 0 0 240px;
  img {
    width: 64px;
    height: 64px;
  }
  padding: 16px;
  
`;

export const PointsContainer = styled.div`
  border-radius: 64px;
  display: flex;
  color: #717171;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  padding: 20px;
  img {
    height: 22px;
    width: 22px;
  }
`;