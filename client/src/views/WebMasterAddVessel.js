import React, { useState } from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Axios from "axios";
import Alert from 'react-bootstrap/Alert'
import 'bootstrap/dist/css/bootstrap.min.css';

const WebMasterAddVessel = () => {
    const [name, setName] = useState(null);
    const [modelLink, setModelLink] = useState(null);
    const [IMOnumber, setIMOnumber] = useState(null);
    const [open, setOpen] = useState(false);
    const [addedVessel, setAddedVessel] = useState(null);
    const [show, setShow] = useState(true);

    const axiosAddUser = async (nameString, modelLinkString, IMOnumberString) => {
        let routeResponse = await Axios.post("http://localhost:5000/users/WebMasterAddVessel",
        {   name: nameString,
            model_link: modelLinkString,
            vesselfinder_link: IMOnumberString
        }); 
        if(routeResponse){
            if(routeResponse.data.vesselName){
              setAddedVessel(routeResponse.data.vesselName);
              console.log(routeResponse.data.vesselName + " has been added to the project.");
              setShow(true);
            }else{
              setAddedVessel('invalid');
              setShow(true);
            }
              
          }else{
            setAddedVessel('invalid');
            setShow(true);
          }
    }
    if(addedVessel && show){
        const name = addedVessel;
        const nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1);
        
        if(addedVessel == 'invalid'){
            //setAddedUser(null);
            return (
            <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                <Alert.Heading>Sorry!</Alert.Heading>
                <p>
                A vessel with the same name already exists within the database. Please try entering a unique vessel name.
                </p>
            </Alert>
            );
        }else{
            return (
            <Alert variant="success" onClose={() => setShow(false)} dismissible>
                <Alert.Heading>Vessel successfully created!</Alert.Heading>
                <p>
                {nameCapitalized} has been created successfully and added to the database. Click the "Update" button to view it.
                </p>
            </Alert>
            );
        }    
    }
    const submit = () => {
        if(name){
            console.log(name);
            setOpen(false); 
            axiosAddUser(name, modelLink, IMOnumber);
            setName(null);
            setModelLink(null);
            setIMOnumber(null);
        }
      }
      const closeModal = () => {
          setOpen(false);
          setName(null);
          setModelLink(null);
          setIMOnumber(null);
      };
      return(
        <div>
        <button type="button" className="register-button" onClick={() => setOpen(o => !o)}>
        Add New Vessel
        </button>
        <Popup open={open} closeOnDocumentClick onClose={closeModal}>
            
        <div className="modal">
            
        Add a new vessel to this project via. ‏‏‎ ‎
        <br></br>

        </div>
        <form class="ui form small fluid">
        <h2>Add New Vessel</h2>
            <label for="exampleInputEmail1">Please enter the name of the vessel you would like to add. ‏‏‎ ‎</label>
            <div class="required field">
                <input
                style={{ height: "35px" }}
                type="text"
                required
                placeholder="Vessel Name"
                onChange={(e) => setName(e.target.value)}
                ></input>
            </div>

            <label for="exampleInputEmail1">Please enter the Model Link of the vessel you would like to add. ‏‏‎ ‎</label>
            <div class="required field">
                <input
                style={{ height: "35px" }}
                type="text"
                required
                placeholder="Model Link"
                onChange={(e) => setModelLink(e.target.value)}
                ></input>
            </div>

            <label for="exampleInputEmail1">Please enter the IMO number of the vessel you would like to add. ‏‏‎ ‎</label>
            <div class="required field">
                <input
                style={{ height: "35px" }}
                type="text"
                required
                placeholder="IMO number"
                onChange={(e) => setIMOnumber(e.target.value)}
                ></input>
            </div>

            <button class="register-button " type="submit" onClick={submit}>
                Submit
            </button>
            <button type="button" className="register-button" onClick={closeModal}>Cancel</button>
            </form>
        </Popup>

    </div>
    )
}
export default WebMasterAddVessel;