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
  border-radius: 8px;
  min-height: 200px;
  color: #fff;
  padding: 0px 24px;
  background: #8A8A8A;
  position: relative;
  background-size: cover;
  box-shadow: inset 0 0 200px 40px #000;

  & .${chipClasses.root}.chip-info {
    padding-block: 12px;
    font-size: 0.875rem;
    line-height: 17px;
  }
`;
