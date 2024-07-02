import React, { useEffect, useRef, useState } from "react";
import "./auth.css";
import axios from "axios";
import { setToken } from "./Auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleLoginFlag } from "./productSlice";
import { setUserInfo } from "./userSlice";

const Login = () => {
  const [usrName, setUsrName] = useState("");
  const [passwd, setPasswd] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const usrRef = useRef();
  const pwRef = useRef();
  const errRef = useRef();
  useEffect(() => {
    usrRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMessage("");
  }, [usrName, passwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/login", {
        username: usrName,
        password: passwd,
      })
      .then((response) => {
        if (response.data.token) {
          setToken(response.data.token);
          navigate("/profile");
          dispatch(toggleLoginFlag(true));
          dispatch(setUserInfo(response.data.userData));
        }
      })
      .catch((error) => {
        if (!error.response) {
          setErrMessage("No Server Response!");
        } else if (error.response?.status === 404) {
          setErrMessage("Username Not Found!");
          usrRef.current.focus();
        } else if (error.response?.status === 401) {
          setErrMessage("Invalid Password");
          pwRef.current.focus();
        } else {
          setErrMessage("Login Failed");
        }
      });
  };
  return (
    <div className="register-container">
      <section>
        <p ref={errRef} className="err">
          {errMessage}
        </p>
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
            ref={pwRef}
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
