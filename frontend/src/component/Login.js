import React, { useEffect, useRef, useState } from "react";
import "./auth.css";
import axios from "axios";
import { setToken } from "./Auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleLoginFlag } from "./productSlice";

const Login = () => {
  const [usrName, setUsrName] = useState("");
  const [passwd, setPasswd] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const usrRef = useRef();

  useEffect(() => {
    usrRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/login", {
        username: usrName,
        password: passwd,
      })
      .then(function (response) {
        if (response.data.token) {
          setToken(response.data.token);
          navigate("/profile");
          dispatch(toggleLoginFlag(true));
        }
      })
      .catch(function (error) {
        console.log(error, "error");
      });
  };
  return (
    <div className="register-container">
      <section>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            ref={usrRef}
            id="username"
            className="auth-input"
            onChange={(e) => setUsrName(e.target.value)}
            value={usrName}
            autoComplete="off"
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            className="auth-input"
            onChange={(e) => setPasswd(e.target.value)}
            value={passwd}
            required
          />
          <button disabled={!passwd && !usrName}>Sign in</button>
        </form>
      </section>
    </div>
  );
};

export default Login;
