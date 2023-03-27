import { Box } from "@mui/material";
import styled from "styled-components";

export const GoalSelectionContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  background: #FFF;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 8px;
`;

export const CardContainer = styled.div`
  width: 300px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  outline: 1px solid rgba(0, 0, 0, 0.2);

  &:hover {
    outline: 1px solid ${(props) => props.theme.palette.primary.main};
    color: ${(props) => props.theme.palette.primary.main};
    div:first-child {
      background: ${(props) => props.theme.palette.primary.light};
      opacity: 0.6;
    }
  }

  &.selected {
    outline-color: transparent;
    border-color: ${(props) => props.theme.palette.primary.dark};
    background: ${(props) => props.theme.palette.primary.main};

    .MuiTypography-root {
      color: #fff;
    }

    div:first-child {
      background-color: rgba(0, 0, 0, 0.1);
      opacity: 1;
    }
  }
`;

export const ImgContainer = styled.div`
  transition: all 0.2s ease;
  width: 100%;
  height: 240px;
  padding: 16px;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;
