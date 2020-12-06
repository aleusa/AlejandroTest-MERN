import React, { useEffect, useContext } from "react";
import UserContext from "../../context/UserContext";

export default function Home(props) {
  const { userData } = useContext(UserContext);
  useEffect(() => {
    if (!userData.user) props.history.push("/welcome");
    props.history.push("/dashboard")
  });
  return <div className="page"><h1>Home</h1></div>;
}