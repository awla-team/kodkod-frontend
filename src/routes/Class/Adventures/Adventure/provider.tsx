import React, { createContext } from 'react';
import { type IClassHasAdventureContext } from './interfaces';
import { type ClassHasAdventureProviderProps } from '../interfaces';

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
        // FIXME: fix this ts error
        // @ts-expect-error ts-error(2322)
        missions,
        // FIXME: fix this ts error
        // @ts-expect-error ts-error(2322)
        students,
        // FIXME: fix this ts error
        // @ts-expect-error ts-error(2322)
        handleUpdateCurrentAdventure,
        // FIXME: fix this ts error
        // @ts-expect-error ts-error(2322)
        updateStageData,
      }}
    >
      {children}
    </ClassHasAdventureContext.Provider>
  );
};

export default ClassHasAdventureProvider;
