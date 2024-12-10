"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";
import { PuuidContextProps } from "@/models/contextSchema";

export const PuuidContext = createContext<{
  contextValue: PuuidContextProps | null;
  setPuuidData: (data: PuuidContextProps) => void;
} | null>(null);

export const PuuidProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [contextValue, setContextValue] = useState<PuuidContextProps | null>(
    null
  );

  const setPuuidData = (data: PuuidContextProps) => {
    setContextValue(data);
  };

  return (
    <PuuidContext.Provider value={{ contextValue, setPuuidData }}>
      {children}
    </PuuidContext.Provider>
  );
};

export const usePuuidContext = () => {
  const context = useContext(PuuidContext);
  if (!context) {
    throw new Error("usePuuidContext must be used within a PuuidProvider");
  }
  return context;
};
