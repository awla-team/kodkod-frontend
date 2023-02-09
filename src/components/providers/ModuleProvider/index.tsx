import { Tab, Tabs } from "@mui/material";
import React, {
  useState,
  createContext,
  FC,
  PropsWithChildren,
  SyntheticEvent,
} from "react";

export const ModuleContext = createContext<any>(null);

const ModuleProvider: FC<PropsWithChildren> = ({ children }) => {
  const [value, setValue] = useState<number>(0);

  const handleChange = (
    event: SyntheticEvent<Element, Event>,
    newValue: any
  ) => {
    setValue(newValue);
  };

  return (
    <ModuleContext.Provider value={{ value, setValue }}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="secondary"
        textColor="inherit"
        variant="fullWidth"
        aria-label="full width tabs example"
      >
        <Tab label="Tablero" />
        <Tab label="Aventuras" />
        <Tab label="Puntajes" />
      </Tabs>
      {children}
    </ModuleContext.Provider>
  );
};

export default ModuleProvider;
