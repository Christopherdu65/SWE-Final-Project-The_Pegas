/* eslint-disable react/style-prop-object */
/* eslint-disable no-alert */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import 'bulma/css/bulma.css';
import Bulma from '@vizuaalog/bulmajs';


export default function Register({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);



  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // api fetch
    fetch(`/api/signup`, {
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

          Bulma().alert({
            type: 'success',
            title: 'Alert',
            body: 'Your registration has been successful',
            confirm: 'confirm',



          });
          setIsRegistered(true)
        } else {

          Bulma().alert({
            type: 'danger',
            title: 'Alert',
            body: 'UserName or Password Is Taken',
            confirm: 'confirm',

          });
        }
      });
  };
  useEffect(() => {
    fetch(`api/me`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUser(true);
        }
      });
  });
  return (
    <div>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Cormorant Garamond" />
      <style>{'body { background-image: url( ../image/registerimage.jpg), url(../image/registerimage.jpg);  background-repeat:no-repeat;  background-position: right top, left top; background-color: white; min-height: 100vh; font-family: "Cormorant Garamond"; }'}</style>
      <div>
        <form className="form" onSubmit={handleSubmit}>
          <div>
            <h2 className="h2">Register Below</h2>
          </div>
          <br /> <br />


          <label htmlFor="username" className="labels"><p className="is-size-2"> Username: </p>
            <input
              id="username"
              className="input is-danger is-light"
              type="text"
              value={username}
              placeholder="Enter username"
              onChange={handleUsernameChange}
            />
          </label>
          <br />
          <br />

          <div>
            <label htmlFor="password" className="labels"><p className="is-size-2">Password: </p>
              <input
                id="password"
                className="input is-danger"
                type="password"
                value={password}
                placeholder="Enter password"
                onChange={handlePasswordChange}
              />
            </label>

            <br /> <br />
          </div>
          <button id="link" className="button is-danger is-light is-large" type="submit">Register</button>
          <br />
          <button type="button" className="button is-danger is-light is-large"> <Link to="/login" id="link">Already a user? sign in here</Link></button>
          <br /> <br /> <br />
          <div>{isRegistered && <Link to="/login">Continue</Link>}</div>
        </form>

      </div >
    </div >

  );
}
