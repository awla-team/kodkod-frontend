import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import {
  CircularProgress,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import theme from "./global/theme";
import Sidebar from "./components/Sidebar";
import { getClassesByUser } from "services/classes";
import { ClassInterface } from "services/classes/interfaces";
import { AxiosResponse } from "axios";
import { FetchStatus } from "global/enums";
import "./App.css";
import CreateClassModal from "./components/Modals";
import { sortClasses } from "./utils";
import { getAllTheLevel } from "./services/levels";
import Toaster from "./utils/Toster";
import { Levels } from "./components/Modals/CreateClassModal/interfaces";
import { useAuth } from "./contexts/AuthContext";
import moment from 'moment';
import 'moment/dist/locale/es';

const App: React.FC = () => {
  const [classes, setClasses] = useState<ClassInterface[]>([]);
  const [levels, setLevels] = useState<Levels[]>([]);
  const { user } = useAuth();
  const [fetching, setFetching] = useState<FetchStatus>(FetchStatus.Idle);
  const [open, setOpen] = useState<boolean>(false);
  const getClassesData = () => {
    getClassesByUser(user.id)
      .then((response: AxiosResponse) => {
        return response?.data?.responseData;
      })
      .then((classes: ClassInterface[]) => {
        if (!!classes && Object.values(classes).length)
          setClasses(sortClasses(classes));
        setFetching(FetchStatus.Success);
      })
      .catch((error) => {
        setFetching(FetchStatus.Error);
        console.log(error);
      });
  };

  const getLevels = async () => {
    try {
      const { data }: { data: { responseData: Levels[] } } =
        await getAllTheLevel();
      setLevels(data.responseData.sort((a, b) => {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;        
        return 0;
      }));
    } catch (e: any) {
      Toaster("error", e.message);
    }
  };

  useEffect(() => {
    moment.locale('es');
  }, []);

  useEffect(() => {
    if (user) {
      setFetching(FetchStatus.Pending);
      getClassesData();
      getLevels();
    }
  }, [user]);

  const handleClose = (
    reason: "backdropClick" | "escapeKeyDown" | "success",
    data?: ClassInterface
  ) => {
    if (reason !== "backdropClick") setOpen(false);
    if (reason === "success") {
      if (data) {
        setClasses((prevState) => {
          return sortClasses([...prevState, data]);
        });
      }
    }
  };

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

  const handleOpenModal = () => {
    setOpen(true);
  };

  return (
    <ThemeWrapper>
      <div className="app-container d-flex">
        <Sidebar classes={classes} handleOpenModal={handleOpenModal} />
        <div className="app-main-container d-flex flex-column flex-fill">
          <div className="app-content container">
            <Outlet context={{ classes, handleOpenModal }} />
          </div>
        </div>
        <CreateClassModal open={open} onClose={handleClose} levels={levels} />
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
