import React, { useEffect, useContext, useState } from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Axios from "axios";

const WebMasterList = () => {
    const [vesselArray, setVesselArray] = useState([]);
    const [vesselName, setVesselName] = useState(0);
    let axiosdeleteVessel;
    let axiosGetVessels;
    useEffect(() => { 
    let routeResponse;
    
    axiosGetVessels = async () => {
        console.log("getting vessels");
        routeResponse = await Axios.post("http://localhost:5000/users/webMasterList"); 
        
        if(routeResponse){
            setVesselArray(routeResponse.data.docArray);
            console.log(routeResponse.data.docArray);
        }else{
            //console.log("no reply");
        }
        
    }
    axiosdeleteVessel = async (vesselid) => {
        //console.log("deleteVessel" + vesselid);
        let routeResponse2 = await Axios.post("http://localhost:5000/users/webMasterListDelete",
        { 
          name: vesselid
        }); 
        //console.log(routeResponse2.data.users);
    }
    });

    const deleteVessel = (event) => {
        const id = event.target.id;
        //console.log(id);
        axiosdeleteVessel(id);
        setTimeout(axiosGetVessels, 1000);
    };

    const updateVessels = () => {axiosGetVessels();};

    if(vesselArray.length > 0){
        let listOfVessels = vesselArray.map(vessel =>
          `<h5 class="card-title">${vessel.name} 
          <button id="${vessel.name}" onClick={deleteVessel} class="webMasterList-button " style="float: right;">Delete</button> 
          </h5>`
        ).join('');
    
        return (
        <div className="page">
            <button type="button" className="register-button" onClick={updateVessels}>Update</button>
            <h3 class="h1-responsive font-weight-bold text-center my-4">________________</h3>
            <h3 class="h1-responsive font-weight-bold text-center my-4">List of Vessels</h3>
            <h3 class="h1-responsive font-weight-bold text-center my-4">________________</h3>
          <table border = "0" cellPadding = "25" cellSpacing = "10"> 
            <div  onClick={deleteVessel} dangerouslySetInnerHTML={{__html: listOfVessels}}></div>
          </table>
        </div>);
    }
    else{
        return(
            <div>
                <br></br>
            <button type="button" className="register-button" onClick={updateVessels}>Update</button>
            <br></br>
            <div>Click "Update" to show any updated vessels from the database.</div>
            </div>
        );
    }
}
export default WebMasterList;