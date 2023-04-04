import { Card } from "@mui/material";
import styled, { DefaultTheme } from "styled-components";

export interface IRewardCardElementProps {
  type: string;
}

export const CustomCard = styled(Card)`
  min-width: 240px;
  width: 240px;
  height: 360px;
  border-radius: 8px;
  position: relative;

  .reward-img > img {
    width: 120px;
    height: 168px;
  }
  
  .points-container {
    position: absolute;
    padding: 4px 16px;
    bottom: 0;
    border: 1px solid #dadada;
    border-radius: 16px 16px 0px 0px;
    border-bottom: none;
    background: #fff;
    img {
      width: 24px;
      height: 24px;
    }
  }
`;