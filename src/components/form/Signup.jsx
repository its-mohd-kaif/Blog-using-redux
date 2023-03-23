import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addUser } from "../../redux/ReduxSlice";
import "./Signup.css";
export const Signup = () => {
  // Ref For Input Fields
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Signup Handler Function
  const signupHandler = (e) => {
    e.preventDefault();
    // Check Validation
    const mailFormet =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (usernameRef.current.value === "") {
      setMessage("Username Field Can Not Be Empty !");
      usernameRef.current.focus();
    } else if (emailRef.current.value === "") {
      setMessage("Email Field Can Not Be Empty !");
      emailRef.current.focus();
    } else if (!emailRef.current.value.match(mailFormet)) {
      setMessage("Write Proper Email !");
      emailRef.current.focus();
    } else if (passwordRef.current.value === "") {
      setMessage("Password Field Can Not Be Empty");
      passwordRef.current.focus();
    } else {
      let temp = [];
      let obj = {
        id: Math.floor(Math.random() * 10000),
        username: usernameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };
      temp.push(obj);
      dispatch(addUser(obj));
      navigate("/signin");
    }
  };
  return (
    <div className="signup__container">
      <center>
        <form className="signup" autocomplete="off">
          <h1>Create account</h1>
          <h2>
            Already have an account?{" "}
            <Link className="signin-btn" to={"/signin"}>
              Sign in
            </Link>
          </h2>

          <div className="signup__field">
            <input
              autoFocus
              ref={usernameRef}
              className="signup__input"
              type="text"
              name="username"
              id="username"
              required
            />
            <label className="signup__label" for="username">
              Username
            </label>
          </div>

          <div className="signup__field">
            <input
              ref={emailRef}
              className="signup__input"
              type="text"
              name="email"
              id="email"
              required
            />
            <label className="signup__label" for="email">
              Email
            </label>
          </div>

          <div className="signup__field">
            <input
              ref={passwordRef}
              className="signup__input"
              type="password"
              name="password"
              id="password"
              required
            />
            <label className="signup__label" for="password">
              Password
            </label>
          </div>
          <button onClick={signupHandler} className="button">
            Sign up
          </button>
          <br></br>
          {message !== "" ? (
            <div
              class="alert alert-warning alert-dismissible fade show"
              role="alert"
            >
              {message}
              <button
                type="button"
                class="btn-close"
                onClick={() => setMessage("")}
              ></button>
            </div>
          ) : null}
        </form>
      </center>
    </div>
  );
};
