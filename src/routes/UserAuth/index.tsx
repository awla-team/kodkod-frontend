import React from "react";
import { Outlet } from "react-router-dom";

const UserAuthLayout: React.FC = () => {
  return (
    <div className="d-flex flex-column h-100 align-items-center justify-content-center p-4">
      <Outlet />
    </div>
  );
};

export default UserAuthLayout;
