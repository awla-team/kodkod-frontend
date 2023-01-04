import { Button } from "@mui/material";
import styled from "styled-components";

export const UserInfoContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const UserInfoButton = styled(Button)`
  && {
    padding: 16px 0px;
    border-radius: 0px;
  }

  div {
    span:first-child {
      background-color: #605cf6;
      padding: 2px 8px;
      width: fit-content;
      border-radius: 24px;
      font-size: 14px;
      font-family: "Arista 2.0";
      color: #fff;
    }
    span:last-child {
      color: gray;
      font-family: "Arista 2.0";
    }
  }

  img {
    width: 72px;
    height: 72px;
    margin-bottom: 8px;
  }
`;
