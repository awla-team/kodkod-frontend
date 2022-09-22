import styled, { ThemeProps } from 'styled-components';
import { CustomTheme } from '../../global.interfaces';

export const HomeContainer = styled.div`
  font-family: "Arista 2.0";
  color: ${(props: ThemeProps<CustomTheme>) => props.theme.titleColor};

  img {
    height: 260px;
  }

  h1 {
    font-size: 48px;    
    span {
      color: ${(props: ThemeProps<CustomTheme>) => props.theme.highlightColor};
    }
  }

  button {
    font-family: "Montserrat";
    font-size: 18px;
    text-transform: none;
    border-radius: 8px;
    width: 240px;
    box-shadow: none;
    background-color: #68bbd4;
    border: 1px solid #68bbd4;
    border-width: 1px;   
  }
`;
