import React, { useState, useEffect, useContext } from "react";
import UserContext from "../../context/UserContext";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Contact(props) {
  const { userData } = useContext(UserContext);
/*
  useEffect(() => {
    if (!userData.user) props.history.push("/login");
  });*/

  if (userData.user) {
    const fname = userData.user.firstName;
    const lname = userData.user.lastName;
    const fnameCapitalized = fname.charAt(0).toUpperCase() + fname.slice(1);
    const lnameCapitalized = lname.charAt(0).toUpperCase() + lname.slice(1);
    var cname = fnameCapitalized + ' ' + lnameCapitalized;
  } else {
    var cname = "";
  }



  if (userData.user) {
    return (
    <div className="page">
      {/* <center><h1>Contact Digital Twin Marine</h1>
      <form id="contact-form" action="/users/sendContact" method="post">
        <div className="contactlabel">
          <label htmlFor="name">Name</label>
          <input type="text" className="contactinput" defaultValue={cname}
            name="user_name" />
        </div>
        <div className="contactlabel">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" className="contactinput" name="user_email"
            aria-describedby="emailHelp" defaultValue={userData.user.email} />
        </div>
        <div className="contactlabel">
          <label htmlFor="name">Phone Number (Optional)</label>
          <input type="text" className="contactinput" name="user_phone" />
        </div>
        <div className="contactlabel">
          <label htmlFor="message">Company (If Applicable)</label>
          <input type="text" className="contactinput" name="user_company" />
        </div>
        <div className="contactlabel">
          <label htmlFor="message">Message</label>
          <textarea className="contactinput-message" name="user_message"
            rows="5"></textarea>
        </div>
        <button type="submit"  className="contactbutton">Submit</button>
      </form></center> */}
      
<section class="mb-4">

<h2 class="h1-responsive font-weight-bold text-center my-4">Contact Digital Twin Marine</h2>

<p class="text-center w-responsive mx-auto mb-5">Do you have any questions? Please do not hesitate to contact us directly!</p>

<div class="row">

    <div class="col-md-9 mb-md-0 mb-5">
        <form id="contact-form" name="contact-form" action="/users/sendContact" method="post">

            <div class="row">

                <div class="col-md-6">
                    <div class="md-form mb-0">
                        <input type="text" id="name" name="user_name" class="form-control" defaultValue={cname}></input>
                        <label for="name" class="">Your name</label>
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="md-form mb-0">
                        <input type="text" id="email" name="user_email" class="form-control" defaultValue={userData.user.email}></input>
                        <label for="email" class="">Your email</label>
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="md-form mb-0">
                        <input type="text" id="number" name="user_phone" class="form-control" placeholder="(555) 555-5555"></input>
                        <label for="email" class="">Phone number (optional)</label>
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="md-form mb-0">
                        <input type="text" id="company" name="user_company" class="form-control" ></input>
                        <label for="company" class="">Company (optional)</label>
                    </div>
                </div>


            </div>

            <div class="row">
                <div class="col-md-12">
                    <div class="md-form mb-0">
                        <input type="text" id="subject" name="subject" class="form-control"></input>
                        <label for="subject" class="">Subject</label>
                    </div>
                </div>
            </div>

            <div class="row">

                <div class="col-md-12">

                    <div class="md-form">
                        <textarea type="text" id="message" name="user_message" rows="2" class="form-control md-textarea"></textarea>
                        <label for="message">Your message</label>
                    </div>

                </div>
            </div>
            <div class="text-center text-md-left">

<button type="submit" class="btn btn-primary" >Send</button>
</div>
        </form>


        <div class="status"></div>
    </div>

    <div class="col-md-3 text-center">
        <ul class="list-unstyled mb-0">
            <li><svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-building" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022zM6 8.694L1 10.36V15h5V8.694zM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15z"/>
  <path d="M2 11h1v1H2v-1zm2 0h1v1H4v-1zm-2 2h1v1H2v-1zm2 0h1v1H4v-1zm4-4h1v1H8V9zm2 0h1v1h-1V9zm-2 2h1v1H8v-1zm2 0h1v1h-1v-1zm2-2h1v1h-1V9zm0 2h1v1h-1v-1zM8 7h1v1H8V7zm2 0h1v1h-1V7zm2 0h1v1h-1V7zM8 5h1v1H8V5zm2 0h1v1h-1V5zm2 0h1v1h-1V5zm0-2h1v1h-1V3z"/>
</svg>
                <p>Fort Lauderdale, FL 33304</p>
            </li>

            <li><svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-telephone-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M2.267.98a1.636 1.636 0 0 1 2.448.152l1.681 2.162c.309.396.418.913.296 1.4l-.513 2.053a.636.636 0 0 0 .167.604L8.65 9.654a.636.636 0 0 0 .604.167l2.052-.513a1.636 1.636 0 0 1 1.401.296l2.162 1.681c.777.604.849 1.753.153 2.448l-.97.97c-.693.693-1.73.998-2.697.658a17.47 17.47 0 0 1-6.571-4.144A17.47 17.47 0 0 1 .639 4.646c-.34-.967-.035-2.004.658-2.698l.97-.969z"/>
</svg>
                <p>+1 (954) 686-7011</p>
            </li>

            <li><svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-envelope-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z"/>
</svg>
                <p>contact@digitaltwinmarine.com</p>
            </li>
        </ul>
    </div>

</div>

</section>

    </div>);
  }
  else 
  {
    return (<div className="page">
      <h1>Contact Digital Twin Marine</h1>
      <form id="contact-form" action="/users/sendContact" method="post">
        <div className="contactlabel">
          <label htmlFor="name">Name</label>
          <input type="text" className="contactinput" defaultValue={cname}
            name="user_name" />
        </div>
        <div className="contactlabel">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" className="contactinput" name="user_email"
            aria-describedby="emailHelp"  />
        </div>
        <div className="contactlabel">
          <label htmlFor="name">Phone Number (Optional)</label>
          <input type="text" className="contactinput" name="user_phone" />
        </div>
        <div className="contactlabel">
          <label htmlFor="message">Company (If Applicable)</label>
          <input type="text" className="contactinput" name="user_company" />
        </div>
        <div className="contactlabel">
          <label htmlFor="message">Message</label>
          <textarea className="contactinput-message" name="user_message"
            rows="5"></textarea>
        </div>
        <button type="submit"  className="contactbutton">Submit</button>
      </form>
    </div>);
  }
} 