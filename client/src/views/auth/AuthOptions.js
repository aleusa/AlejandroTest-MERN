import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";

export default function AuthOptions() {
  const { userData, setUserData } = useContext(UserContext);

  const history = useHistory();

  const register = () => history.push("/register");
  const login = () => history.push("/login");
  const dashboard = () => history.push("/dashboard");
  const contact = () => history.push("/contact");
  const myAccount = () => history.push("/myAccount");
  const logout = () => {
    history.push("/login");
    setUserData({
      token: undefined,
      user: undefined,
      currVessel: undefined
    });
    localStorage.setItem("auth-token", "");
  };

  return (
    <nav className="auth-options">
      {userData.user ? (
        userData.user.webMaster ? ( 
          <button onClick={logout}>Log out</button>
        )
        : (
        <>
        <button onClick={dashboard}>Dashboard</button>
        <button onClick={myAccount}>My Account</button>
        <button onClick={contact}>Contact</button>  
        <button onClick={logout}>Log out</button>
        </>
      )) : (
        <>
          <button onClick={register}>Register</button>
          <button onClick={login}>Log in</button>
        </>
      )}
    </nav>
  );
}