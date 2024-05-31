import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import "../style/Login.css";

const API_URL = import.meta.env.VITE_API_URL;

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
    <div className="flex min-h-full flex-col justify-center items-center  px-6 py-12 lg:px-8 bg-midnight">
    <div className="md:w-1/3 p-6 bg-white border border-gray-200 rounded-lg shadow">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-darkgray">
          Login to My Wallet
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleLoginSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-darkgray "
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleEmail}
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-darkgray"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                type="password"
                name="password"
                value={password}
                onChange={handlePassword}
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <br />
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-lightblue hover:bg-opacity-80 px-3 py-1.5 text-sm font-semibold leading-6 text-midnight shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-darkgray ">
          Not a member?
          <Link
            to={"/signup"}
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
             {" "}Sign Up
          </Link>
        </p>
      </div>
      </div>
    </div>
  );
}

export default LoginPage;
