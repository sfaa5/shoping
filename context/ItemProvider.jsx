"use client";

import React, { createContext, useContext, useState } from "react";

const stateContext = createContext(null);

export const StateProvider = ({ children }) => {
  const [items, setItems] = useState();

  return (
    <stateContext.Provider value={{ items, setItems }}>
      {children}
    </stateContext.Provider>
  );
};

export const useSharedState = () => {
  const context = useContext(stateContext);
  if (!context) {
    throw new Error(
      "useSharedState must be used within a StateProvider"
    );
  }
  return context;
};
