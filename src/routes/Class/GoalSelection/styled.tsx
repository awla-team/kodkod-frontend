import { Box } from "@mui/material";
import styled from "styled-components";

export const GoalSelectionContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 8px;
`;

export const CardContainer = styled(Box)`
  
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  .goal-card-text {
    transition: all 0.2s ease;
    background: #fff;
    border-radius: 16px;
    position: absolute;
    bottom: 28px;
  }

  &:hover {
    color: ${(props) => props.theme.palette.primary.main};
    div:first-child {
      background: ${(props) => props.theme.palette.primary.light};
      opacity: 0.6;
    }
  }

  &.selected {
    outline: 3px solid ${(props) => props.theme.palette.primary.main};
    .goal-card-text {
      background: ${(props) => props.theme.palette.primary.main};
      color: #fff;
    }

    div:first-child {
      background-color: rgba(0, 0, 0, 0.1);
      opacity: 1;
    }
  }

  img {
    width: 100%;
    border-radius: 8px;
  }
`;

export const ImgContainer = styled.div`
  transition: all 0.2s ease;  
  padding: 16px;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;
