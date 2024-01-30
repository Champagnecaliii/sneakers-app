import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [userUID, setUserUID] = useState(null);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  const data = {
    email,
    setEmail,
    username,
    setUsername,
    userUID,
    setUserUID,
    isUserAuthenticated,
    setIsUserAuthenticated,
  };

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};
