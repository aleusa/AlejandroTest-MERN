import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
//import UserContext from "../context/UserContext";

export default function Home(props) {
    const history = useHistory();
    const dashboard = () => history.push("/dashboard");
/*     const { userData } = useContext(UserContext);
    useEffect(() => {
        if (!userData.user) props.history.push("/login");
    });  */


  return (<div className="page"><h1>Thank you.</h1>
  <h3>Your new account has been created. <br></br> Please allow 24 hours for your Digital Twin Marine to be viewable on your dashboard. </h3>
<button onClick={dashboard} class="continue-button ">Continue to Dashboard </button>
  
  </div>);
}