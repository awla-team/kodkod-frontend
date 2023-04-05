import { Button, Card } from "@mui/material";
import styled from "styled-components";

export const ChangeMissionButton = styled(Button)`
  position: absolute;
  right: 10px;
  top: -24px;
  height: 40px;
  width: 40px;
  border-radius: 100%;
  box-shadow: 0 0 2px rgba(33, 33, 33, 0.4);
  min-width: unset;
`;

export const PointsContainer = styled.div`
  background: #fff;
  color: rgba(0, 0, 0, 0.8);
  border-radius: 8px;
  width: 120px;
  height: 100%;

  img {
    width: 30px;
  }
`;

export const MissionCardContainer = styled(Card)`
  height: 200px;
  &.MuiPaper-root {
    position: relative;
    color: #fff;
    border-radius: 8px;
    overflow: visible;
    box-shadow: 0px 0px 10px rgba(33, 33, 33, 0.5);

    transition: opacity 0.2s ease, transform 0.2s ease;

    &.clickable {
      cursor: pointer;  
      &:hover {
        transform: scale(1.05);
      }
    }

    &.selected {
      outline: 3px solid #000;
      opacity: 0.8;
    }
  }
`;