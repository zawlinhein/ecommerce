import React, { useEffect, useRef, useState } from "react";
import "./auth.css";
import { FaCheck, FaTimes, FaInfoCircle } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PwdReset = ({ isPwdOpen, setIsPwdOpen, username }) => {
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  const errRef = useRef();

  const [pw, setPw] = useState("");
  const [validPw, setValidPw] = useState(false);
  const [pwFocus, setPwFocus] = useState(false);

  const [matchPw, setMatchPw] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMessage, setErrMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setErrMessage("");
  }, [pw, matchPw]);

  useEffect(() => {
    const result = PWD_REGEX.test(pw);
    setValidPw(result);
    const match = pw === matchPw;
    setValidMatch(match);
  }, [pw, matchPw]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:8000/reset-pwd/${isPwdOpen}`, { password: pw })
      .then((response) => {
        console.log(response.data);
        setIsPwdOpen(null);
      })
      .catch((error) => {
        if (!error.response) {
          setErrMessage("No Server Response!");
        } else {
          setErrMessage("Reset Failed");
        }
        errRef.current.focus();
      });
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-filter backdrop-blur-md">
      <section>
        <p ref={errRef} className="text-red-600 text-center">
          {errMessage}
        </p>
        <h1 className="mb-5 text-center font-bold text-xl">
          Reset Password for {username}
        </h1>
        <form onSubmit={handleSubmit}>
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
            className={pw && !validPw ? "margin-right:0.25rem" : "offscreen"}
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
            <FaTimes className={validMatch || !matchPw ? "hide" : "invalid"} />
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
          <button onClick={() => setIsPwdOpen(null)}>Cancel</button>
          <button disabled={!validPw || !validMatch} type="submit">
            Register
          </button>
        </form>
      </section>
    </div>
  );
};

export default PwdReset;
