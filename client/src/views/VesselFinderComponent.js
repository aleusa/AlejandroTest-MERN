import React, { useContext, Component } from "react";
import UserContext from "../context/UserContext";





//import ScriptTag from 'react-script-tag';
//Reference : https://stackoverflow.com/questions/60346201/how-to-embed-external-js-script-file-into-react-component

const  VesselFinderComponent = (props) => {
const { userData } = useContext(UserContext);

      
        return (

            
            <div dangerouslySetInnerHTML={{ __html: '<iframe name="vesselfinder" id="vesselfinder" '
              + ' width="' + "100%" + '"'
              + ' height="' + "300" + '"'
              + ' frameborder="0"'
              + ' src="https://www.vesselfinder.com/aismap?'
              + 'zoom=' + ((window.zoom === undefined) ? 'undefined' : window.zoom)
              + ((window.latitude === undefined) ? '&amp;lat=undefined' : '&amp;lat='+window.latitude)
              + ((window.longitude === undefined) ? '&amp;lon=undefined' : '&amp;lon='+window.longitude)
              + '&amp;width=' + window.width
              + '&amp;height=' + window.height
              + '&amp;names='+"false"
              + ((window.mmsi === undefined) ? '' : '&amp;mmsi=' + window.mmsi)
              + ((window.imo === undefined) ? '&amp;imo='+(''+userData.currVessel.VFlink) : '&amp;imo=' + (''+userData.currVessel.VFlink +'') ) //EDIT THE IMO HERE TO TRACK A SPECIFIC SHIP!!!!!
              + '&amp;track=' + "true"
              + ((window.fleet === undefined) ? '&amp;fleet=false' : '&amp;fleet='+window.fleet)
              + ((window.fleet_name === undefined) ? '&amp;fleet_name=false' : '&amp;fleet_name='+window.fleet_name)
              + ((window.fleet_timespan !== undefined) ? '&amp;fleet_timespan=' + window.fleet_timespan : '')
              + ((window.fleet_hide_old_positions === undefined) ? '&amp;fleet_hide_old_positions=false' : '&amp;fleet_hide_old_positions='+window.fleet_hide_old_positions)
              + '&amp;clicktoact=' + window.click_to_activate
              + '&amp;store_pos=' + window.store_position
              + ((window.fil === undefined) ? '' : '&amp;fil=' + window.fil)
              + ((window.default_maptype === undefined) ? '' : '&amp;default_maptype=' + window.default_maptype)
              + '&amp;ra='+window.ra
              + '">Browser does not support embedded objects.<br/>Visit directly <a href="https://www.vesselfinder.com" target="_blank">www.vesselfinder.com</a>'
              + '</iframe>'}}>
                </div>
          
        );
      
      
}
export default VesselFinderComponent;