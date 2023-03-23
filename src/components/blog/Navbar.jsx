import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import Blog from "./Blog";
// Navbar Component
function Navbar() {
  const [user, setUser] = useState("");
  // Logout Handler
  const logoutHandler = () => {
    localStorage.removeItem("loginUser");
  };
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("loginUser")) !== null) {
      setUser(JSON.parse(localStorage.getItem("loginUser")));
    } else {
      setUser("");
    }
  }, []);
  return (
    <div>
      <nav
        style={{ borderBottom: "1px solid lightGray" }}
        className="navbar fixed-top navbar-expand-lg navbar-light bg-light"
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img style={{ width: "80%" }} src={logo} alt="logo" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
            <form className="d-flex">
              <div className="me-3">
                {user !== "" ? (
                  <div style={{ marginTop: "0.5em", fontSize: "large" }}>
                    Welcome &nbsp;<i className="fas fa-user-alt"></i>{" "}
                    {user.username}
                  </div>
                ) : null}
              </div>
              <Link
                to={"/signin"}
                className="btn btn-outline-success me-3"
                type="submit"
              >
                Login
              </Link>
              <button
                to={"/signup"}
                className="btn btn-outline-success me-3"
                type="submit"
                onClick={logoutHandler}
              >
                Logout
              </button>
            </form>
          </div>
        </div>
      </nav>
      <Blog />
    </div>
  );
}

export default Navbar;
