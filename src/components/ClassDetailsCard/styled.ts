import styled from "styled-components";
import { Box } from "@mui/material";
import { IAdventureBannerProps } from "./interfaces";

export const DetailsCardContent = styled(Box)`
  display: flex;
  flex-direction: column;
  background-color: #FFF;
`;

export const AdventureBanner = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  background-image: ${(props: IAdventureBannerProps) => props.img ? `url(${props.img})` : 'none'};
  background-position: center;
  background-repeat: no-repeat;
  box-shadow: inset 0 0 200px 40px #000;
  border-radius: 8px;
  color: #fff;
`;