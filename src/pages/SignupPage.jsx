import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


const API_URL = import.meta.env.VITE_API_URL

function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password, name };

    axios
      .post(`${API_URL}/auth/signup`, requestBody)
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        console.log(error.response.data);

      });
  };

  return (
    <div className="SignupPage">
      <h1 className="title-sign-up">Sign Up</h1>
      <br />
      <form onSubmit={handleSignupSubmit} className="form-sign-up">
        <label className="email-label">Email:</label>
        <input
          className="email-input"
          type="email"
          name="email"
          value={email}
          onChange={handleEmail}
        />

        <label className="pw-label">Password:</label>
        <input
          className="pw-input"
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />
        <label className="name-label">Name:</label>
        <input
          className="name-input"
          type="text"
          name="name"
          value={name}
          onChange={handleName}
        />

        <button type="submit" className="btn-sign-up">
          Sign Up
        </button>
      </form>
    <br />
    <br />
    
      <p className="p-sign-up">Already have account?</p>
      <br />
     
      <button className="btn-login-sign-up"><Link to={"/login"}> Login</Link></button>
    </div>
  );
}

export default SignupPage;
