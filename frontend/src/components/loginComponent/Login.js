/* eslint-disable react/prop-types */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from "react";

import { Link } from "react-router-dom";
import "./Login.css";
import 'bulma/css/bulma.css';
import Bulma from '@vizuaalog/bulmajs';



export default function Login({ setUser }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // api fetch
    fetch(`/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.success != null) {
          setUser(true);
        } else {

          Bulma().alert({
            type: 'danger',
            title: 'Alert',
            body: 'Wrong Login Information! Please Try Again',
            confirm: 'Confirm!',

          });



        }
      });
  };


  return (
    <div  >
      <style>{'body { background-color: whitesmoke;  min-height: 100vh }'}</style>
      <div className="field">
        <form id="formnames" onSubmit={handleSubmit}  >
          <div>
            <h1 id="header" className="subtitle is-1">  <style>{'body { background: whitesmoke; }'}</style>Login In</h1>
          </div>
          <br />
          <br />
          <div>
            <label htmlFor="username" className="label"> <p className="is-size-5"> Username: </p>
              <input
                className="input is-danger"
                id="username"
                type="text"
                value={username}
                placeholder="Enter username"
                onChange={handleUsernameChange}
              />
            </label>


          </div>



          <br /> <br />
          <div>
            <label htmlFor="password" className="label"> <p className="is-size-5"> Password: </p>   <input
              className="input is-danger"
              id="password"
              type="password"
              value={password}
              placeholder="Enter password"
              onChange={handlePasswordChange}
            /> </label>

            <br /> <br />
          </div>
          <button id="button" className="button is-danger" type="submit">Login</button>
          <br /> <br />
          <button className="button is-danger" type="button"><Link to="/register" id="link">Not a user? Please Sign up here</Link></button>
        </form>
      </div >


    </div >

  );
}
