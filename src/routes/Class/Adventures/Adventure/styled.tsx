import styled from "styled-components";
import { IAdventureBannerProps } from "./interfaces";
import {chipClasses} from '@mui/material/Chip'

export const AdventureContainer = styled.div`
  margin-top: 36px;
  li {
    list-style-image: url(/src/assets/images/check-icon.png);
  }
`;

export const AdventureBanner = styled.div`
  width: 100%;
  border-radius: 16px;
  min-height: 238px;
  color: #fff;
  top: 0;
  left: 0;
  z-index: -1;
  padding: 36px 24px;
  background: #8A8A8A;

  background-size: cover;
  //box-shadow: inset 0px 0px 1240px 24px #000;

  & .${chipClasses.root}.chip-info {
    padding-block: 12px;
    font-size: 0.875rem;
    line-height: 17px;
  }
`;
