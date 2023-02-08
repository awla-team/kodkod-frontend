import styled from "styled-components";

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
