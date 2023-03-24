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

  .class-img-container {
    background: lightgray;
    border: none;
    border-radius: 8px 8px 0px 0px;
    height: 160px;
    transition: all 0.3s ease;
  }

  & a {
    color: #000;
    text-decoration: none;
    font-weight: normal;
  }

  & .class__level__cards__container {
    display: flex;
    &:last-child {
      margin-bottom: 24px;
    }    

    & .class__level__card {      
      border-radius: 8px;      
      min-height: 194px;      
      display: flex;
      flex-direction: column;      
      margin-bottom: 24px;
      transition: all 0.3s ease;
      box-shadow: 0 0 2px rgba(33, 33, 33, 0.6);
      border: 1px solid transparent;

      &:hover {
        color: ${(props) => props.theme.palette.primary.dark};
        border: 1px solid ${(props) => props.theme.palette.primary.dark};

        .class-img-container {
          background-color: gray;
        }
      }
    }
  }
`;

export const CardContainer = styled.div`
  width: 280px;
  height: 320px;
  padding: 24px;
  border: 1px solid black;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  filter: brightness(50%);

  &:hover {
    transform: scale(1.05);
    border-color: #53a8b6;
    color: #53a8b6;
    filter: brightness(100%);
  }

  &.selected {
    transform: scale(1.05);
    border-color: #de4ce1;
    filter: brightness(100%);

    .MuiTypography-root {
      color: #de4ce1;
    }
  }
`;

export const ImgContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 16px;
  background-color: silver;
  // border: 1px solid grey;
  border-radius: 16px;
`;
