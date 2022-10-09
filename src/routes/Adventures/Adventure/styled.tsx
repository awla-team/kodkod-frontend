import styled from "styled-components";
import { IAdventureBannerProps } from "./interfaces";

export const AdventureContainer = styled.div`  
  margin-top: 36px;
  li {
    list-style-image: url(/src/assets/images/check-icon.png);    
  }
`;

export const AdventureBanner = styled.div`
  width: 100%;
  border-radius: 16px;
  color: #fff;
  top: 0;
  left: 0;
  z-index: -1;
  background-image: url(${(props: IAdventureBannerProps) => props.backgroundImg});
  background-size: cover;
  box-shadow: inset 0px 0px 1240px 24px #000;  
`;