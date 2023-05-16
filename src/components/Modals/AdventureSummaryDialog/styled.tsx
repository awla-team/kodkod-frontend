import { Box } from '@mui/system';
import styled from 'styled-components';
import { IAdventureBannerProps } from './interfaces';

export const AdventureBanner = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  padding: 64px 24px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  box-shadow: inset 0 0 200px 40px #000;
  border-radius: 0px;
  color: #fff;

  .demo-indicator {
    display flex;
    width: 60px;
    align-items: center;
    justify-content: center;
    background: ${(props) => props.theme.palette.highlight.main};
    padding: 4px 8px;
    text-align: center;
    border-radius: 16px;
  }
`;
