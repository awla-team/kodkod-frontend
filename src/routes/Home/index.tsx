import React, { SyntheticEvent, useState } from "react";
import { Button, Tab, Tabs } from "@mui/material";
import { HomeContainer } from "./styled";
import cats from "./../../assets/images/cats.png";
import Adventures from "../Adventures";

const Home: React.FC = () => {
  const [selectedTab, selectTab] = useState<number>(0);

  const changeTab = (_event: SyntheticEvent<Element, Event>, newValue: any) => {
    selectTab(newValue);
  };

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
        // sx={{ width: "100vw", background: "white" }}
      >
        <Tab label="Tablero" />
        <Tab label="Aventuras" />
        <Tab label="Puntajes" />
      </Tabs>
      <TabPanel value={selectedTab} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={selectedTab} index={1}>
        <Adventures />
      </TabPanel>
      <TabPanel value={selectedTab} index={2}>
        Item Three
      </TabPanel>
      {/* <HomeContainer className="d-flex h-100 w-100 flex-column align-items-center justify-content-center">
          <img src={cats} alt="" />
          <h1>
            ¡Bienvenido a <span>kodkod</span>!
          </h1>
          <h3 className="mb-3">
            Completa misiones, sube de nivel y diviertete
          </h3>
          <div>
            <Button
              className="me-2"
              variant="contained"
              size="large"
              color="primary"
              disableElevation
            >
              ¿Qué es kodkod?
            </Button>
          </div>
        </HomeContainer> */}
    </>
  );
};

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      // style={{ padding: "80px 32px 32px 32px" }}
      style={{ padding: "32px" }}
      className="w-100 h-100 overflow-auto"
      {...other}
    >
      {children}
    </div>
  );
};

export default Home;
