import styled from "styled-components";
import { IIconContainerProps } from "./interfaces";

export const SkillPointsContainer = styled.div`
  img {
    width: 18px;
    heigth: 18px;
  }

  .skill-point {
    height: 10px;
    width: 10px;
    border-radius: 24px;
    &:not(:last-child) {
      margin-right: 4px;
    }
  }
`;

export const IconContainer = styled.div`
  background: ${(props: IIconContainerProps) => props.background || "#000"};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 36px;

  img {
    height: 16px;
    width: 16px;
    &.blank-icon {
      background: #d9d9d9;
      border-radius: 50%;
    }
  }
`;

export const Point = styled.div`
  height: 10px;
  width: 10px;
  border-radius: 24px;
  background: red;
  &:not(:last-child) {
    margin-right: 4px;
  }
`;
