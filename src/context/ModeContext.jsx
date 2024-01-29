import { createContext, useState } from "react";

export const ModeContext = createContext();

export const ModeContextProvider = ({ children }) => {
  const [isDarkModeOn, setIsDarkModeOn] = useState(false);

  const data = {
    isDarkModeOn,
    setIsDarkModeOn
  };

  return <ModeContext.Provider value={data}>{children}</ModeContext.Provider>;
};
