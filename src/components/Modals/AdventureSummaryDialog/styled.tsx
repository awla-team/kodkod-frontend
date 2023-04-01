import { Box } from "@mui/system";
import styled from "styled-components";
import { IAdventureBannerProps } from "./interfaces";

export const AdventureBanner = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  padding: 64px 24px;
  background-image: ${(props: IAdventureBannerProps) => props.img ? `url(${props.img})` : 'none'};
  background-position: center;
  background-repeat: no-repeat;
  box-shadow: inset 0 0 200px 40px #000;
  border-radius: 0px;
  color: #fff;
`;