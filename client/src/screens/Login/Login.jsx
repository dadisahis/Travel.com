import { Button } from "@mui/material";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { loginUser } from "../../api/api";
import "./login.scss";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });
  const { loading, error, dispatch } = useContext(AuthContext);

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    const res = loginUser(credentials);
    res
      .then((data) => {
        dispatch({ type: "LOGIN_SUCCESS", payload: data.details });
        navigate("/");
      })
      .catch((err) => {
        dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
      });
  };
  return (
    <div className="login">
      <div className="login_container">
        <div className="login_wrapper">
          <h1>Travel.com</h1>
          <div className="input_container">
            <p>Username</p>
            <input
              type="text"
              placeholder="username"
              onChange={handleChange}
              className="username"
              id="username"
            />
          </div>
          <div className="input_container">
            <p>Password</p>
            <input
              type="password"
              placeholder="password"
              onChange={handleChange}
              className="password"
              id="password"
            />
          </div>
          <Button className="loginButton" onClick={handleClick}>
            Login
          </Button>
          {error && <span>{error.message}</span>}
        </div>
      </div>
    </div>
  );
}

export default Login;
