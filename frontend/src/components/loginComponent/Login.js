/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import "./Login.css";
import "bulma/css/bulma.css";
import { useAlert } from "react-alert";

export default function Login({ setUser }) {
  const alert = useAlert();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    fetch(`api/me`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUser(true);
        }
      });
  });
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
          alert.show("Wrong Credentials~ Please Try Again");
        }
      });
  };

  return (
    <div>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Cormorant Garamond"
      />
      <style>
        {
          'body { background-image: url(../image/loginimage.jpg);  background-repeat:no-repeat; background-repeat:no-repeat; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover;background-color: whitesmoke; min-height: 100vh; font-family: "Cormorant Garamond"; }'
        }
      </style>
      <div className="field">
        <form id="formnames" onSubmit={handleSubmit}>
          <div>
            <h1 className="login"> Login in Here to get started</h1>
          </div>
          <br />
          <br />
          <div>
            <label htmlFor="username" className="labels">
              {" "}
              <p className="is-size-2"> Username: </p>
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
            <label htmlFor="password" className="labels">
              {" "}
              <p className="is-size-2"> Password: </p>{" "}
              <input
                className="input is-danger"
                id="password"
                type="password"
                value={password}
                placeholder="Enter password"
                onChange={handlePasswordChange}
              />{" "}
            </label>
            <br /> <br />
          </div>
          <button
            id="link"
            className="button is-danger is-light is-large"
            type="submit"
          >
            <p> Login</p>
          </button>
          <br /> <br />
          <div>
            <button
              className="button is-danger is-light is-large"
              type="button"
            >
              <div>
                <Link to="/register" className="Roboto">
                  <p id="link">Not a user? Please Sign up here</p>
                </Link>
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
