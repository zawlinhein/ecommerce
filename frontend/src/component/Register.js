import React, { useEffect, useRef, useState } from "react";
import { FaCheck, FaTimes, FaInfoCircle } from "react-icons/fa";
import "./auth.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  const userRef = useRef();
  const errRef = useRef();

  const navigate = useNavigate();

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

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pw);
    setValidPw(result);
    const match = pw === matchPw;
    setValidMatch(match);
  }, [pw, matchPw]);

  useEffect(() => {
    setErrMessage("");
  }, [user, pw, matchPw]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/register", {
        username: user,
        password: pw,
      })
      .then(function (response) {
        navigate("/login");
      })
      .catch(function (error) {
        console.log(error, "error");
      });
  };

  return (
    <div className="register-container">
      <section>
        <p ref={errRef}>{errMessage}</p>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username" className="bellay">
            Username:
            <FaCheck className={validName ? "valid" : "hide"} />
            <FaTimes className={!validName && user ? "invalid" : "hide"} />
          </label>
          <input
            type="text"
            ref={userRef}
            id="username"
            className="auth-input"
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
            aria-invalid={validName ? "false" : "true"}
            aria-describedby="userInputNote"
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
          />
          <p
            id="userInputNote"
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

          <label htmlFor="password" className="bellay">
            Password:
            <FaCheck className={validPw ? "valid" : "hide"} />
            <FaTimes className={!validPw && pw ? "invalid" : "hide"} />
          </label>
          <input
            type="password"
            required
            id="password"
            className="auth-input"
            onChange={(e) => setPw(e.target.value)}
            value={pw}
            aria-invalid={validPw ? "false" : "true"}
            aria-describedby="userPwNote"
            onFocus={() => setPwFocus(true)}
            onBlur={() => setPwFocus(false)}
          />
          <p
            id="userPwNote"
            className={
              pwFocus && !validPw ? "margin-right:0.25rem" : "offscreen"
            }
          >
            <FaInfoCircle />
            8 to 24 characters.
            <br />
            Must include uppercase and lowercase letters, a number and a special
            character.
            <br />
            Allowed special characters:{" "}
            <span aria-label="exclamation mark">!</span>{" "}
            <span aria-label="at symbol">@</span>{" "}
            <span aria-label="hashtag">#</span>{" "}
            <span aria-label="dollar sign">$</span>{" "}
            <span aria-label="percent">%</span>
          </p>

          <label htmlFor="confirm_pwd" className="bellay">
            Confirm Password:
            <FaCheck className={validMatch && matchPw ? "valid" : "hide"} />
            <FaTimes className={validPw || !pw ? "hide" : "invalid"} />
          </label>
          <input
            type="password"
            id="confirm_pwd"
            className="auth-input"
            onChange={(e) => setMatchPw(e.target.value)}
            value={matchPw}
            required
            aria-invalid={validMatch ? "false" : "true"}
            aria-describedby="confirmnote"
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
          />
          <p
            id="confirmnote"
            className={matchFocus && !validMatch ? "instructions" : "offscreen"}
          >
            <FaInfoCircle />
            Must match the first password input field.
          </p>
          <button disabled={!validName || !validPw || !validMatch}>
            Register
          </button>
        </form>
      </section>
    </div>
  );
};

export default Register;
