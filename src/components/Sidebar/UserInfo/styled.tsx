import { Button, Fab } from '@mui/material';
import styled from 'styled-components';

export const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    font-weight: bold;
    font-size: 16px;
    text-align: center;
  }
`;

export const UserInfoButton = styled.div`
  outline: 1px solid transparent;
  padding: 8px 8px;
  border-radius: 8px;
  transition: all 0.3s ease;
  img {
    width: 32px;
    height: 32px;
    border-radius: 100%;
    outline: 1px solid transparent;
    transition: all 0.3s ease;
  }
  svg {
    opacity: 0.8;
    transition: all 0.3s ease;
  }

  &:hover {
    outline: 1px solid rgba(0, 0, 0, 0.1);
    img {
      outline: 1px solid ${(props) => props.theme.palette.primary.dark};
    }
    svg {
      opacity: 1;
    }
  }
`;
