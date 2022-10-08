import { Card } from '@mui/material';
import styled from 'styled-components';
import { IAdventureCardContainerProps } from './interfaces';

export const AdventureCardContainer = styled(Card)`
  width: 300px;
  height: 240px;  
  background-image: url(${(props: IAdventureCardContainerProps) => props.img});   
  background-position: center; 
  background-repeat: no-repeat;
  box-shadow: inset 0 0 300px 40px #000;
  
  &:hover {
    box-shadow: inset 0 0 100px 20px #000;    
    cursor: pointer;
  }
  &.MuiPaper-root {
    color: ${(props) => props.theme.palette.primary.contrastText};
    border-radius: 16px;
    background-size: cover;
  }  
`;