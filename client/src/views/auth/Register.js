import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";
import { Link } from "react-router-dom"

export default function Register() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [companyName, setCompanyName] = useState();
  const [error, setError] = useState();
  

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const newUser = { email, password, passwordCheck, firstName, lastName, companyName };
      await Axios.post("http://localhost:5000/users/register", newUser);
      
      const loginRes = await Axios.post("http://localhost:5000/users/login", {
        email,
        password,
      });

      console.log(loginRes.email);
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/confirmation");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <div id ="root">
	<div className="limiter">
		<div className="container-login100">
			<div className="wrap-login100">
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
				<form className="login100-form validate-form p-l-55 p-r-55 p-t-178" onSubmit={submit}>
					<span className="login100-form-title">
						Register
					</span>

					<div className="wrap-input100 validate-input m-b-16" data-validate="Please enter First name">
						<input className="input100" type="text" name="fname" placeholder="First name*" onChange={(e) => setFirstName(e.target.value)}/>
						<span className="focus-input100"></span>
					</div>

					<div className="wrap-input100 validate-input" data-validate = "Please enter Last name">
						<input className="input100" type="text" name="lname" placeholder="Last Name*" onChange={(e) => setLastName(e.target.value)}/>
						<span className="focus-input100"></span>
					</div>

          <div className="wrap-input100 validate-input" data-validate = "Please enter Company name">
						<input className="input100" type="text" name="cname" placeholder="Company Name" onChange={(e) => setCompanyName(e.target.value)}/>
						<span className="focus-input100"></span>
					</div>

          <div className="wrap-input100 validate-input" data-validate = "Please enter Email Address">
						<input className="input100" type="text" name="email" placeholder="Email*" onChange={(e) => setEmail(e.target.value)}/>
						<span className="focus-input100"></span>
					</div>

          <div className="wrap-input100 validate-input" data-validate = "Please enter password">
						<input className="input100" type="password" name="pass" placeholder="Password*" onChange={(e) => setPassword(e.target.value)}/>
						<span className="focus-input100"></span>
					</div>

          <div className="wrap-input100 validate-input" data-validate = "Please reenter password">
						<input className="input100" type="password" name="pass" placeholder="Verify Password" onChange={(e) => setPasswordCheck(e.target.value)}/>
						<span className="focus-input100"></span>
					</div>

          <div className="container-login100-form-btn">
						<button className="login100-form-btn" onClick={submit}>
							Register
						</button>
					</div>

					<div className="flex-col-c p-t-90 p-b-30">
						<span className="txt1 p-b-9">
							Already have an account?
						</span>

						<a href="/Login" className="txt3">
							Login
						</a>
					</div>
				</form>
			</div>
		</div>
	</div>
  </div>
  );
}
/* <div className="page">
      <h2>Register</h2>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      <form className="form" onSubmit={submit}>
      <label htmlFor="register-first-name">First Name *</label>
        <input
          id="register-first-name"
          type="text"
          onChange={(e) => setFirstName(e.target.value)}
        />

        
        <label htmlFor="register-last-name">Last Name *</label>
        <input
          id="register-last-name"
          type="text"
          onChange={(e) => setLastName(e.target.value)}
        />

        <label htmlFor="register-company-name">Company Name</label>
        <input
          id="register-company-name"
          type="text"
          onChange={(e) => setCompanyName(e.target.value)}
        />

        <label htmlFor="register-email">Email *</label>
        <input
          id="register-email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="register-password">Password *</label>
        <input
          id="register-password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Verify password"
          onChange={(e) => setPasswordCheck(e.target.value)}
        />

        
        <input type="submit" value="Register" />
        <label htmlFor="login-password">Already have an account? Click 
        <Link to="/login"> here </Link>
        to login.
        </label>
      </form>
    </div>*/