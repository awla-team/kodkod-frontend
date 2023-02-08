import { IAdventure } from "global/interfaces";
import React, { useState, useEffect, createContext } from "react";
import { useParams } from "react-router-dom";
import { getAdventure } from "services/adventures";
import { IAdventureContext } from "./interfaces";

export const AdventureContext = createContext<IAdventureContext>({
  adventure: undefined,
});

const AdventureProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { adventureId } = useParams();
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
