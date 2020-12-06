import React, { useState, useEffect, useContext, Component } from "react";
import UserContext from "../context/UserContext";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Axios from "axios";
import Alert from 'react-bootstrap/Alert'
import 'bootstrap/dist/css/bootstrap.min.css';

      const  AddProjectMembersComponent = () => {
        const [email, setEmail] = useState(null);
        const [addedUser, setAddedUser] = useState(null);
        const [open, setOpen] = useState(false);
        const { userData, setUserData } = useContext(UserContext);


        const axiosAddUser = async (emailstring) => {
          let routeResponse = await Axios.post("http://localhost:5000/users/addProjectMember",
          { email: emailstring,
            vesselID: userData.currVessel.id
          }); 
    
          if(routeResponse){
            if(routeResponse.data.nameOfAddedUser){
              setAddedUser(routeResponse.data.nameOfAddedUser);
              //return routeResponse.data.nameOfAddedUser + '';
              console.log(routeResponse.data.nameOfAddedUser + " has been added to the project.");
              setShow(true);
            }else{
              setAddedUser('invalid');
              setShow(true);
            }
              
          }else{
            setAddedUser('invalid');
            setShow(true);
          }
        }
        
        const submit = () => {
          if(email){
              console.log(email);
              setOpen(false); 
              axiosAddUser(email);


              setEmail(null);
          }
        }
        
        const closeModal = () => {
            setOpen(false);
            setEmail(null);
        };

        const [show, setShow] = useState(true);
        
        
        
        if(addedUser && show){
          const name = addedUser;
          const nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1);
          
          if(addedUser == 'invalid'){
            //setAddedUser(null);
            return (
              <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                <Alert.Heading>Sorry!</Alert.Heading>
                <p>
                  The user email address you entered does not currently exist in our system. 
                </p>
              </Alert>
            );

          }else{
            return (
              <Alert variant="success" onClose={() => setShow(false)} dismissible>
                <Alert.Heading>User successfully added to project!</Alert.Heading>
                <p>
                  {nameCapitalized} has been added to the project. This user now has immediate access to the project page and should recieve an email alert shortly.
                </p>
              </Alert>
            );
          }

          

        }


        return(
/*             <Popup trigger={<button className="register-button "> Add Project Member </button>} position="right center">
            <div>Add a new user to this project via email address. ‏‏‎ ‎‏‏‎ ‎
            ‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‎‎
           <form class="ui form small fluid">
                <div class="required field">
                  <input
                    style={{ height: "35px" }}
                    type="text"
                    required
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                </div>
                <button class="register-button " type="submit" onClick={close}>
                  Submit
                </button>
              </form>
            </div> 
          </Popup> */
          <div>

          <button type="button" className="register-button" onClick={() => setOpen(o => !o)}>
            Add New Project Member
          </button>
          <Popup open={open} closeOnDocumentClick onClose={closeModal}>
              
            <div className="modal">
                
            Add a new user to this project via email address. ‏‏‎ ‎
            <br></br>
‏
            </div>
            <form class="ui form small fluid">
            <label for="exampleInputEmail1">Please enter the email address of the user you would like to add to this project. ‏‏‎ ‎</label>
                <div class="required field">
                  <input
                    style={{ height: "35px" }}
                    type="text"
                    required
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                </div>
                <button type="button" className="register-button" onClick={closeModal}>Cancel</button>
                <button class="register-button " type="submit" onClick={submit}>
                  Submit
                </button>
                
              </form>
            
          </Popup>

        </div>
        )
        }
      
        export default AddProjectMembersComponent;
//}
