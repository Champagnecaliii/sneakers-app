import React, { useContext } from "react";
import { UserContext } from "../context";
import { Navigate } from "react-router-dom";
import { routes } from ".";

const ProtectedRoutes = ({ children }) => {
  const { isUserAuthenticated } = useContext(UserContext);

  return isUserAuthenticated ? (
    children
  ) : (
    <Navigate to={routes.home.dashboard} />
  );
};

export default ProtectedRoutes;