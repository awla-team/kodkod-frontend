import { IAdventure } from "global/interfaces";
import React, { useState, useEffect, createContext } from "react";
import { useParams } from "react-router-dom";
import { getAdventure } from "services/adventures";
import { IAdventureContext } from "./interfaces";
import { AdventureProviderProps } from "../interfaces";

export const AdventureContext = createContext<IAdventureContext>({
  adventure: undefined,
});

const AdventureProvider: React.FC<AdventureProviderProps> = ({
  children,
  adventure,
}) => {
  return (
    <AdventureContext.Provider value={{ adventure }}>
      {children}
    </AdventureContext.Provider>
  );
};

export default AdventureProvider;
