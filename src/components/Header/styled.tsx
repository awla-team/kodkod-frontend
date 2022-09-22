import styled from 'styled-components';
import { Button, Paper } from '@mui/material';

export const HeaderContainer = styled.div`
  background: rgba(255, 255, 255, 0);  
  width: 100%;
  height: 100px;
  padding: 4px 36px;
  position: fixed;
  backdrop-filter: blur(4px);
  box-shadow: 2px 0px 5px 2px rgba(0, 0, 0, 0.1);
  z-index: 1;
  top: 0;
  left: 0;
`;

export const UserInfoButton = styled(Button)`
  div {
    span:first-child {
      background-color: #605CF6;
      padding: 2px 8px;
      width: fit-content;
      border-radius: 24px;
      font-size: 14px;
      font-family: 'Arista 2.0';
      color: #FFF;
    }
    span:last-child {
      color: gray;
      font-family: 'Arista 2.0';
    }
  }
  img {
    width: 42px;
    height: 42px;
    margin-right: 8px;
  }
`;