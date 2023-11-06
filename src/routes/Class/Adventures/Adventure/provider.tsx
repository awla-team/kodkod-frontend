import React, { createContext } from 'react';
import { IClassHasAdventureContext } from './interfaces';
import { ClassHasAdventureProviderProps } from '../interfaces';

export const ClassHasAdventureContext =
  createContext<IClassHasAdventureContext>({
    classHasAdventure: undefined,
    missions: [],
    students: [],
    handleUpdateCurrentAdventure: (data) => {},
    updateStageData: (stage) => {},
  });

const ClassHasAdventureProvider: React.FC<ClassHasAdventureProviderProps> = ({
  children,
  classHasAdventure,
  missions,
  students,
  handleUpdateCurrentAdventure,
  updateStageData,
}) => {
  return (
    <ClassHasAdventureContext.Provider
      value={{
        classHasAdventure,
        missions,
        students,
        handleUpdateCurrentAdventure,
        updateStageData,
      }}
    >
      {children}
    </ClassHasAdventureContext.Provider>
  );
};

export default ClassHasAdventureProvider;
