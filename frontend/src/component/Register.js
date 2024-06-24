import userEvent from "@testing-library/user-event";
import React, { useEffect, useRef, useState } from "react";
import { FaCheck, FaTimes, FaInfoCircle } from "react-icons/fa";
import "./auth.css";
import { toBeRequired } from "@testing-library/jest-dom/matchers";
import { useRadioGroup } from "@mui/material";

const Register = () => {
  const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pw, setPw] = useState("");
  const [validPw, setValidPw] = useState(false);
  const [pwFocus, setPwFocus] = useState(false);

  const [matchPw, setMatchPw] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMessage, setErrMessage] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(user);
    setPw(result);
    const match = pw === matchPw;
    setMatchPw(match);
  }, [pw, matchPw]);

  useEffect(() => {
    setErrMessage("");
  }, [user, pw, matchPw]);

  return (
    <section>
      <p ref={errRef}>{errMessage}</p>
      <h1>Register</h1>
      <form>
        <label htmlFor="username">
          Username:
          <span className={validName ? "valid" : "hide"}>
            <FaCheck />
          </span>
          <span className={!validName && user ? "invalid" : "hide"}>
            <FaTimes />
          </span>
        </label>
        <input
          type="text"
          ref={userRef}
          id="username"
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          required
          aria-invalid={validName ? "false" : "true"}
          aria-describedby="userInputNote"
          onFocus={() => setUserFocus(true)}
          onBlur={() => setUserFocus(false)}
        />
        <p
          className={
            userFocus && user && !validName
              ? "margin-right:0.25rem"
              : "offscreen"
          }
        >
          <FaInfoCircle />
          4 to 24 characters.
          <br />
          Must begin with a letter.
          <br />
          Letters, numbers, underscores, hyphens allowed.
        </p>
      </form>
    </section>
  );
};

export default Register;
