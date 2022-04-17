/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
// import "./components/quizComponent/Settings.js";

import "./Navbar.css";

import React from "react";
import { NavLink } from "react-router-dom";
import { useAlert } from "react-alert";
import "bulma/bulma.sass";

function Navbar({ user, setUsers }) {
  const alert = useAlert();
  const handleLogout = () => {
    fetch(`/api/logout`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.success != null) {
          setUsers(false);
          alert.show("You have been logged out.");
        }
      });
  };
  if (user) {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <h1 className="navbar-item"> Trivia App</h1>
        </div>
        <div id="navbarBasicExample" className="navbar-menu">
          <li className="navbar-item">
            <NavLink to="/welcome">Welcome</NavLink>
          </li>
          <li className="navbar-item">
            <NavLink to="/settings">Play Now</NavLink>
          </li>
          <li className="navbar-item">
            <NavLink to="/leaderboard">Leaderboard</NavLink>
          </li>
        </div>
        <hr className="navbar-divider" />
        <div className="navbar-item has-dropdown is-hoverable">
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <li className="button is-light">
                  <NavLink to="/profile"> Profile</NavLink>
                </li>
                <li className="button is-light">
                  <NavLink id="button" to="/login" onClick={handleLogout}>
                    {" "}
                    Logout
                  </NavLink>
                </li>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <h1 className="navbar-item"> Trivia App</h1>
      </div>
      <div id="navbarBasicExample" className="navbar-menu">
        <li className="navbar-item">
          <NavLink to="/"> Home </NavLink>
        </li>

        <li className="navbar-item">
          <NavLink to="/aboutus"> About the Creators </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink to="/contactus"> Contact Us </NavLink>
        </li>
      </div>
      <hr className="navbar-divider" />
      <div className="navbar-item has-dropdown is-hoverable">
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <li className="button is-light">
                <NavLink to="/login">Login Here!</NavLink>
              </li>
              <li className="button is-light">
                <NavLink to="/register"> Register Here! </NavLink>
              </li>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
