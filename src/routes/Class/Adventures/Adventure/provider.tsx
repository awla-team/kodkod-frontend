import React, { createContext } from 'react';
import { IAdventureContext } from './interfaces';
import { AdventureProviderProps } from '../interfaces';

export const AdventureContext = createContext<IAdventureContext>({
  adventure: undefined,
  missions: [],
  students: [],
  handleUpdateCurrentAdventure: (data) => {},
  updateStageData: (stage) => {},
});

const AdventureProvider: React.FC<AdventureProviderProps> = ({
  children,
  adventure,
  missions,
  students,
  handleUpdateCurrentAdventure,
  updateStageData,
}) => {
  return (
    <AdventureContext.Provider
      value={{
        adventure,
        missions,
        students,
        handleUpdateCurrentAdventure,
        updateStageData,
      }}
    >
      {children}
    </AdventureContext.Provider>
  );
};

export default AdventureProvider;
