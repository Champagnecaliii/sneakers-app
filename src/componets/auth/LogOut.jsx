import React, { useContext } from "react";
import { logOut } from "../../authService";
import { UserContext } from "../../context";

const LogOut = () => {
  const { setIsUserAuthenticated } = useContext(UserContext);

  const handleLogOut = async () => {
    try {
      await logOut();
      setIsUserAuthenticated(false);
    } catch (error) {
      console.log("Something went wrong!");
      console.log(error?.message);
    }
  };

  return <button className="btn btn-outline-danger" onClick={handleLogOut}>
  Log Out
</button>
};

export default LogOut;