import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import "../style/Login.css"


const API_URL = import.meta.env.VITE_API_URL

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };
    axios
      .post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        console.log(errorDescription);
      });
  };

  return (
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bgcolor-dashboard">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-color-login">Login to My Wallet</h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form class="space-y-6" onSubmit={handleLoginSubmit}>
      <div>
        <label for="email" class="block text-sm font-medium leading-6 text-color-login ">Email address</label>
        <div class="mt-2">
          <input 
            type="email"
            name="email"
            value={email}
            onChange={handleEmail}
            autocomplete="email" 
            required 
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div>
        <label for="password" class="block text-sm font-medium leading-6 text-color-login">Password</label>
        <div class="mt-2">
          <input 
            type="password"
            name="password"
            value={password}
            onChange={handlePassword} 
            autocomplete="current-password" 
            required 
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div>
        <button type="submit" class="flex w-full justify-center rounded-md btn-color-login px-3 py-1.5 text-sm font-semibold leading-6 text-color shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
      </div>
    </form>

    <p class="mt-10 text-center text-sm text-color-login">
      Not a member?
      <a href="#" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Sign Up</a>
    </p>
  </div>
</div>
    
  );
}

export default LoginPage;
