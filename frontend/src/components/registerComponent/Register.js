/* eslint-disable react/style-prop-object */
/* eslint-disable no-alert */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
        if (data.success) {
          alert("Registration Sucessfull");
          setIsRegistered(true)
        } else {
          alert("username is already in use or invalid");
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
    <form onSubmit={handleSubmit}>
      <div>
        <h1>Register With Us</h1>
      </div>
      <br /> <br />
      <label htmlFor="username">Username: </label>
      <input
        type="text"
        value={username}
        placeholder="Enter username"
        onChange={handleUsernameChange}
      />
      <br />
      <br />
      <div>
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          value={password}
          placeholder="Enter password"
          onChange={handlePasswordChange}
        />
        <br /> <br />
      </div>
      <button type="submit">Register</button>
      <br />
      <Link to="/login">Already a user? sign in here</Link>
      <br /> <br /> <br />
      <div>{isRegistered && <Link to="/login">Continue</Link>}</div>
    </form>
  );
}
