import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Sign in Component
function Signin() {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  // Login Handler
  const loginHandler = (e) => {
    e.preventDefault();
    // Check Validation
    if (usernameRef.current.value === "") {
      setMessage("Username field can not be empty !");
      usernameRef.current.focus();
    } else if (passwordRef.current.value === "") {
      setMessage("Password field can not be empty !");
      passwordRef.current.focus();
    } else if (JSON.parse(localStorage.getItem("blogUsers")) === null) {
      setMessage("Create Your Account");
    } else {
      let users = JSON.parse(localStorage.getItem("blogUsers"));
      console.log("LOGIN", users);
      // eslint-disable-next-line array-callback-return
      users.map((val) => {
        if (
          val.username !== usernameRef.current.value ||
          val.password !== passwordRef.current.value
        ) {
          setMessage("Username or Password Not Matched");
        } else if (
          val.username === usernameRef.current.value &&
          val.password === passwordRef.current.value
        ) {
          let obj = {
            username: usernameRef.current.value,
            password: passwordRef.current.value,
          };
          localStorage.setItem("loginUser", JSON.stringify(obj));
          alert("Login Successfully");
          navigate("/");
        }
      });
    }
  };
  return (
    //Display Login Form
    <div className="signup__container">
      <center>
        <form className="signup" autocomplete="off">
          <h1>Login</h1>
          <h2>
            New Member ?{" "}
            <Link className="signin-btn" to={"/signup"}>
              Sign up
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
          <button onClick={loginHandler} className="button">
            Log in
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
}

export default Signin;
