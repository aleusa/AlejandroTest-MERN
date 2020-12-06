import React, { useEffect, useContext, useState } from "react";
import UserContext from "../../context/UserContext";
//import Accountinfo from './Accountinfo';

export default function MyAccount(props) {
  const { userData } = useContext(UserContext);
  useEffect(() => {
    if (!userData.user) props.history.push("/login");
  });

  if (userData.user){
    const fname = userData.user.firstName;
    const lname = userData.user.lastName;
    const fnameCapitalized = fname.charAt(0).toUpperCase() + fname.slice(1);
    const lnameCapitalized = lname.charAt(0).toUpperCase() + lname.slice(1);
    if(userData.user.companyName){
      return (
        /*<div className="page">
          {users.map(user => (
            <Accountinfo company ={user.company} email = {user.email}/>
          ))}
          
        </div>*/
          <div>
            <div className="acc-header">
            <img src="default-profile-picture.png" alt=""/>
            <h1>   {fnameCapitalized} {lnameCapitalized}</h1>
            </div>
    
          <div><h1 className="accountlabel">Account Info </h1></div>
          <div className="account-page-info">
            <h3>Company: {userData.user.companyName}</h3>
            <h3>Email: {userData.user.email}</h3>
          </div>
          </div>
          
        );
    }else{
      return (
          <div>
            <div className="acc-header">
            <img src="default-profile-picture.png" alt=""/>
            <h1>   {fnameCapitalized} {lnameCapitalized}</h1>
            </div>
    
          <div><h1 className="accountlabel">ACCOUNT INFO </h1></div>
          <div className="account-page-info">

          
          <h3><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-envelope" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383l-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z"/>
          </svg> Email: {userData.user.email}</h3>

          <h3><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-building" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022zM6 8.694L1 10.36V15h5V8.694zM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15z"/>
          <path d="M2 11h1v1H2v-1zm2 0h1v1H4v-1zm-2 2h1v1H2v-1zm2 0h1v1H4v-1zm4-4h1v1H8V9zm2 0h1v1h-1V9zm-2 2h1v1H8v-1zm2 0h1v1h-1v-1zm2-2h1v1h-1V9zm0 2h1v1h-1v-1zM8 7h1v1H8V7zm2 0h1v1h-1V7zm2 0h1v1h-1V7zM8 5h1v1H8V5zm2 0h1v1h-1V5zm2 0h1v1h-1V5zm0-2h1v1h-1V3z"/>
          </svg>Company: N/A</h3>

          
          </div>
          </div>
          
        );
    }
    
  }else{
    return (<div><h1 className="accountlabel">Account Info </h1></div>);
  }
  
}
