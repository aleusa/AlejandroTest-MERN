import React from 'react';
import '../../style.css';

function Accountinfo({company,email}){
    return(
        <div>
            <h3>{company}</h3>
            <h3>{email}</h3>
        </div>
    );

}
export default Accountinfo