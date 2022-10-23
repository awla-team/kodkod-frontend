import styled from "styled-components";

export const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;

  div {
    width: 100%;
    align-items: center;

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
    width: 64px;
    height: 64px;
    margin-bottom: 8px;
  }
`;
