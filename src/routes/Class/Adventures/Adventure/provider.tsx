import React, { createContext } from "react";
import { IAdventureContext } from "./interfaces";
import { AdventureProviderProps } from "../interfaces";

export const AdventureContext = createContext<IAdventureContext>({
  adventure: undefined,
  missions: [],
  students: [],
  handleUpdateCurrentAdventure: (data) => {},
  updateStagesData: (stage) => {},
});

const AdventureProvider: React.FC<AdventureProviderProps> = ({
  children,
  adventure,
  missions,
  students,
  handleUpdateCurrentAdventure,
  updateStagesData,
}) => {
  return (
    <AdventureContext.Provider
      value={{
        adventure,
        missions,
        students,
        handleUpdateCurrentAdventure,
        updateStagesData,
      }}
    >
      {children}
    </AdventureContext.Provider>
  );
};

export default AdventureProvider;
