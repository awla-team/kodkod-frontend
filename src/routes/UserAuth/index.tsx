import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const UserAuthLayout: React.FC = () => {
  return (
    <UserAuthLayoutContainer>
      <Outlet />
    </UserAuthLayoutContainer>
  );
};

const UserAuthLayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

export default UserAuthLayout;
