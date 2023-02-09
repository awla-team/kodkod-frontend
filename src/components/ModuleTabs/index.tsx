import React, { useState, FC, SyntheticEvent } from "react";
import { Tab, Tabs } from "@mui/material";
import { ModuleTabsProps } from "./interfaces";

const ModuleTabs: FC<ModuleTabsProps> = ({ children, tabs, onChange }) => {
  const [selectedTab, selectTab] = useState<number>(0);

  const handleChange = (
    _event: SyntheticEvent<Element, Event>,
    newValue: any
  ) => {
    selectTab(newValue);
  };

  return (
    <>
      <Tabs
        value={selectedTab}
        onChange={onChange}
        indicatorColor="secondary"
        textColor="inherit"
        variant="fullWidth"
        aria-label="full width tabs example"
      >
        {tabs}
        <Tab label="Tablero" />
        <Tab label="Aventuras" />
        <Tab label="Puntajes" />
      </Tabs>
      <div style={{ padding: "24px" }}>{children}</div>
    </>
  );
};

ModuleTabs.defaultProps = {
  onChange: () => {},
};

export default ModuleTabs;
