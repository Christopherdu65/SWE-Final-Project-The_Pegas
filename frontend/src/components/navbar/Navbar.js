/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
// import "./components/quizComponent/Settings.js";
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/anchor-has-content */

import "./Navbar.css";
import 'bulma/css/bulma.css';
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
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Cormorant Garamond" />
        <style>{'body {font-family: "Cormorant Garamond"; }'}</style>

        <div className="navbar-brand">
          <h1 id="tivia" className="navbar-item">  <NavLink className="start" id="a" to="/"> Trivia App</NavLink ></h1 >
          <a id="a" role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>

        </div>
        <div id="navbarBasicExample" className="navbar-menu">
          <li className="navbar-item">
            <NavLink id="a" to="/welcome">Welcome</NavLink>
          </li>
          <li className="navbar-item">
            <NavLink className="playnow" id="a" to="/settings">Play Now</NavLink>
          </li>
          <li className="navbar-item">
            <NavLink className="leaderboard" id="a" to="/leaderboard">Leaderboard</NavLink>
          </li>
        </div>
        <hr className="navbar-divider" />

        <div className="navbar-end">

          <li className="navbar-item">
            <NavLink id="a" className="profile" to="/profile" >  Profile
            </NavLink>
          </li>
          <li className="navbar-item">
            <NavLink id="a" className="logout" to="/" onClick={handleLogout}>  Logout
            </NavLink>
          </li>

        </div>


      </nav >

    )
  }
  return (
    <nav className="navbar"
      role="navigation"
      aria-label="main navigation">
      <div className="navbar-brand">
        <h1 id="tivia" className="navbar-item">   <p><a id="a" href="/">Trivia App</a> </p></h1 >
        <a id="a" role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>

      </div>
      <div id="navbarBasicExample" className="navbar-menu">
        <li className="navbar-item">
          <a id="a" href="#about">About</a>
        </li>
        <li className="navbar-item">
          <a id="a" href="#creators">Meet The Developers</a>
        </li>
        <li className="navbar-item">
          <a id="a" href="#contactus">Contact</a>
        </li>
      </div>


      <hr className="navbar-divider" />
      <div className="navbar-item has-dropdown is-hoverable">
        <li id="dropdown" className="navbar-link">
          Get Started
        </li>
        <div className="navbar-dropdown">
          <div className="navbar-item">
            <div className="buttons">
              <li id="dropdown" className="navbar-item">
                <NavLink id="a" to="/login">Login Here!</NavLink>
              </li>

              <li id="dropdown" className="navbar-item">
                <NavLink id="a" to="/register">  Register Here! </NavLink>
              </li>
            </div>

          </div>
        </div>

      </div>
    </nav >




  )


}

export default Navbar;
