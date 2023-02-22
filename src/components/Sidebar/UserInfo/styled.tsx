import { Button, Fab } from "@mui/material";
import styled from "styled-components";

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
  img {
    width: 48px;
    height: 48px;
    border-radius: 100%;
    outline 3px solid transparent;
    transition: all 0.3s ease;
  }
  &:hover img {
    outline: 3px solid ${(props) => props.theme.palette.secondary.main};
  }
`;
