import React, { createContext } from "react";
import { IAdventureContext } from "./interfaces";
import { AdventureProviderProps } from "../interfaces";

export const AdventureContext = createContext<IAdventureContext>({
  adventure: undefined,
  missions: [],
  students: [],
  handleUpdateCurrentAdventure: (data) => {},  
  makeAdventureNull: () => {},
  updateStageData: (stage) => {},
});

const AdventureProvider: React.FC<AdventureProviderProps> = ({
  children,
  adventure,
  missions,
  students,
  handleUpdateCurrentAdventure,
  makeAdventureNull,
  updateStageData,
}) => {
  return (
    <AdventureContext.Provider
      value={{
        adventure,
        missions,
        students,
        handleUpdateCurrentAdventure,
        makeAdventureNull,
        updateStageData,
      }}
    >
      {children}
    </AdventureContext.Provider>
  );
};

export default AdventureProvider;
