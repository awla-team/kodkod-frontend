import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { TabPaths } from "./interfaces";
import { NavTabsContainer } from "./styled";
import { useClassContext } from "./Context";

const TAB_PATHS: TabPaths = {
  0: "tablero",
  1: "aventuras",
  2: "puntajes",
};

const Class: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [selectedTab, selectTab] = useState<number>(
    pathname.includes(TAB_PATHS[0])
      ? 0
      : pathname.includes(TAB_PATHS[1])
      ? 1
      : pathname.includes(TAB_PATHS[2])
      ? 2
      : 0
  );

  const changeTab = (
    _event: React.SyntheticEvent<Element, Event> | null,
    tabIndex: number
  ) => {
    selectTab(tabIndex);
  };

  useEffect(() => {
    if (pathname.includes(TAB_PATHS[0])) changeTab(null, 0);
    if (pathname.includes(TAB_PATHS[1])) changeTab(null, 1);
    if (pathname.includes(TAB_PATHS[2])) changeTab(null, 2);
  }, [pathname]);

  const { classDetails, students } = useClassContext();

  return (
    <>
      <NavTabsContainer>
        <Box
          className={"nav__tab"}
          role={"button"}
          onClick={() => {
            navigate(TAB_PATHS[0]);
          }}
        >
          <img className={"nav__icon"} src={"/dashboard.svg"} />
          <span className={"nav__title"}>Dashboard</span>
        </Box>
        <Box
          className={"nav__tab"}
          role={"button"}
          onClick={() => {
            navigate(TAB_PATHS[1]);
          }}
        >
          <img className={"nav__icon"} src={"/rocket.svg"} />
          <span className={"nav__title"}> Adventure</span>
        </Box>

        <Box
          className={"nav__tab"}
          role={"button"}
          onClick={() => {
            navigate(TAB_PATHS[2]);
          }}
        >
          <img className={"nav__icon"} src={"/progress.svg"} />
          <span className={"nav__title"}>Progress</span>
        </Box>

        <Box
          className={"nav__tab"}
          role={"button"}
          onClick={() => {
            navigate(TAB_PATHS[2]);
          }}
        >
          <img className={"nav__icon"} src={"/reports.svg"} />
          <span className={"nav__title"}>Reports</span>
        </Box>
      </NavTabsContainer>
      <Box
        role="tabpanel"
        className="w-100 overflow-auto"
        sx={{ padding: "32px" }}
      >
        <Outlet context={{ classDetails, students }} />
      </Box>
    </>
  );
};

export default Class;
