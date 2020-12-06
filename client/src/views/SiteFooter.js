import React from "react";
import { Link } from "react-router-dom";
import AuthOptions from "./auth/AuthOptions";
import 'bootstrap/dist/css/bootstrap.min.css';
export default function SiteFooter() {
  return (
<div class="footer">

 <table className="ftable">
  <tr><td><img className="imgfooter" src="https://digitaltwinmarine.com/wp-content/uploads/2020/07/DTM-Logo-NoWords.png"></img></td>
  <td><p>contact@digitaltwinmarine.com <br></br>
         +1 (954) 686-7011<br></br>
         2598 E. Sunrise Blvd, Suite 2104, Fort Lauderdale, FL 33304</p>
  </td>
  </tr>
</table> 
</div>
  );
}