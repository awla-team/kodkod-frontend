import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { TabPaths } from "./interfaces";

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

  return (
    <>
      <Tabs
        value={selectedTab}
        onChange={changeTab}
        indicatorColor="secondary"
        textColor="inherit"
        variant="fullWidth"
        aria-label="full width tabs example"
        className="sticky-top"
        sx={{ background: "white", zIndex: 1 }}
      >
        <Tab
          label="Tablero"
          onClick={() => {
            navigate(TAB_PATHS[0]);
          }}
        />
        <Tab
          label="Aventuras"
          onClick={() => {
            navigate(TAB_PATHS[1]);
          }}
        />
        <Tab
          label="Puntajes"
          onClick={() => {
            navigate(TAB_PATHS[2]);
          }}
        />
      </Tabs>
      <div
        role="tabpanel"
        style={{ padding: "32px" }}
        className="w-100 overflow-auto"
      >
        <Outlet />
      </div>
    </>
  );
};

export default Class;
