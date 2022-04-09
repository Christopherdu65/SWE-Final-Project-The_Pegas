/* eslint-disable react/prop-types */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from "react";
import { Link } from "react-router-dom";

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
        if (data.success) {
          setUser(true);
        } else {
          alert("Something is wrong with your credentials, try again");
        }
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h1>Login With US</h1>
      </div>
      <br />
      <br />
      <label htmlFor="username">Username: </label>
      <input
        type="text"
        value={username}
        placeholder="Enter username"
        onChange={handleUsernameChange}
      />
      <br /> <br />
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
      <button type="submit">Login</button>
      <Link to="/register">not a user? sign up</Link>
    </form>
  );
}
