import React from "react";
import { Outlet } from "react-router-dom";

const UserAuthLayout: React.FC = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default UserAuthLayout;
