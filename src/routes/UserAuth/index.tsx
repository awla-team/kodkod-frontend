import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

const UserAuthLayout: React.FC = () => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    return <Navigate to={"/app"} />;
  }
  return (
    <>
      <Outlet />
    </>
  );
};

export default UserAuthLayout;
