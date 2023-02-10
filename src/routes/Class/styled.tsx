import styled, { ThemeProps, DefaultTheme } from 'styled-components';
import {Box} from "@mui/material";

export const HomeContainer = styled.div`
  font-family: "Arista 2.0";  

  img {
    height: 260px;
  }

  h1 {
    font-size: 48px;    
    span {
      color: ${(props: ThemeProps<DefaultTheme>) => props.theme.palette.primary.main};
    }
  }

`;

export const NavTabsContainer= styled(Box)`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  & .nav__tab{
    flex-basis: 15%;
    max-width: 25%;
    min-width: 100px;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    min-height: 80px;
    text-align: center;
    align-items: center;
    gap: 0.5rem;
    & .nav__icon{
      max-width: 36px;
      max-height: 36px;
    }
    
    & .nav__title{
      font-size: 1.25rem;
    }
  }
`

/* button {
    font-family: "Montserrat";
    font-size: 18px;
    text-transform: none;
    border-radius: 8px;
    width: 240px;
    box-shadow: none;
    background-color: #68bbd4;
    border: 1px solid #68bbd4;
    border-width: 1px;   
  }*/

