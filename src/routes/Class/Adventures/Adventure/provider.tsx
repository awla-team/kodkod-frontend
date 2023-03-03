import React, { createContext } from "react";
import { IAdventureContext } from "./interfaces";
import { AdventureProviderProps } from "../interfaces";

export const AdventureContext = createContext<IAdventureContext>({
  adventure: undefined,
  missions: [],
  students: [],
  handleUpdateCurrentAdventure: (data) => {},
});

const AdventureProvider: React.FC<AdventureProviderProps> = ({
  children,
  adventure,
  missions,
  students,
  handleUpdateCurrentAdventure,
}) => {
  return (
    <AdventureContext.Provider
      value={{ adventure, missions, students, handleUpdateCurrentAdventure }}
    >
      {children}
    </AdventureContext.Provider>
  );
};

export default AdventureProvider;
