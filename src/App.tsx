import React from "react";
import { Outlet } from "react-router-dom";
import { ThemeProvider as MuiThemeProvider } from "@mui/material";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import theme from "./global/theme";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import ModuleProvider from "./components/providers/ModuleProvider";

const App: React.FC = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <StyledThemeProvider theme={theme}>
        <div className="app-container d-flex">
          <Sidebar />
          <div className="app-main-container d-flex flex-column flex-fill">
            {/* <ModuleProvider> */}
            {/* <Header /> */}
            <div className="app-content w-100">
              <Outlet />
            </div>
            {/* </ModuleProvider> */}
          </div>
        </div>
      </StyledThemeProvider>
    </MuiThemeProvider>
  );
};

export default App;
