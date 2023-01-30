import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import {
  CircularProgress,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import theme from "./global/theme";
import Sidebar from "./components/Sidebar";
import { getClassesByTeacherId } from "services/classes";
import { ClassInterface } from "services/classes/interfaces";
import { AxiosResponse } from "axios";
import { TEST_USER } from "services/users";
import { FetchStatus } from "global/enums";
import "./App.css";

const App: React.FC = () => {
  // TODO: remove this fake data when integration with backend is completed
  const [classes, setClasses] = useState<ClassInterface[]>([]);
  const [fetching, setFetching] = useState<FetchStatus>(FetchStatus.Idle);

  useEffect(() => {
    setFetching(FetchStatus.Pending);
    getClassesByTeacherId(TEST_USER.id)
      .then((response: AxiosResponse) => response?.data)
      .then((classes: ClassInterface[]) => {
        if (!!classes && Object.values(classes).length) setClasses(classes);
        setFetching(FetchStatus.Success);
      })
      .catch((error) => {
        setFetching(FetchStatus.Error);
        console.log(error);
      });
  }, []);

  if (fetching === FetchStatus.Idle || fetching === FetchStatus.Pending)
    return (
      <ThemeWrapper>
        <div className="app-container d-flex">
          <div className="d-flex w-100 h-100 justify-content-center align-items-center">
            <CircularProgress />
          </div>
        </div>
      </ThemeWrapper>
    );

  // TODO: uncomment this when integration with backend is completed
  // if (fetching === FetchStatus.Error)
  //   return (
  //     <ThemeWrapper>
  //       <div className="app-container d-flex">
  //         <div className="d-flex w-100 h-100 justify-content-center align-items-center">
  //           <h1>Hubo un error</h1>
  //         </div>
  //       </div>
  //     </ThemeWrapper>
  //   );

  // On fetching success
  return (
    <ThemeWrapper>
      <div className="app-container d-flex">
        <Sidebar classes={classes} />
        <div className="app-main-container d-flex flex-column flex-fill">
          <div className="app-content container">
            <Outlet context={{ classes }} />
          </div>
        </div>
      </div>
    </ThemeWrapper>
  );
};

const ThemeWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <MuiThemeProvider theme={theme}>
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </MuiThemeProvider>
  );
};

export default App;
