import { IAdventure } from "global/interfaces";
import React, { useState, useEffect, createContext } from "react";
import { getAdventure } from "services/adventures";
import { IAdventureContext, IAdventureProviderProps } from "./interfaces";

export const AdventureContext = createContext<IAdventureContext>({
  adventure: undefined,
});

const AdventureProvider: React.FC<IAdventureProviderProps> = ({
  children,
  adventureId,
}) => {
  const [adventure, setAdventure] = useState<IAdventure | undefined>(undefined);

  useEffect(() => {
    if (adventureId) {
      getAdventure(adventureId)
        .then(({ data }) => setAdventure(data))
        .catch((e) => console.log(e));
    }
  }, [adventureId]);

  return (
    <AdventureContext.Provider value={{ adventure }}>
      {children}
    </AdventureContext.Provider>
  );
};

export default AdventureProvider;
