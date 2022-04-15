/* eslint-disable react/style-prop-object */
/* eslint-disable no-alert */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "bulma/css/bulma.css";
import Bulma from "@vizuaalog/bulmajs";

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
                        type: "success",
                        title: "Alert",
                        body: "Your registration has been successful",
                        confirm: "confirm",
                    });
                    setIsRegistered(true);
                } else {
                    Bulma().alert({
                        type: "danger",
                        title: "Alert",
                        body: "UserName or Password Is Taken",
                        confirm: "confirm",
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
            <style>
                {"body { background-color: whitesmoke;  min-height: 100vh }"}
            </style>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <h1 id="header" className="subtitle is-1">
                            {" "}
                            <style>
                                {"body { background: whitesmoke; }"}
                            </style>{" "}
                            Welcome!
                        </h1>
                        <h2 className="subtitle is-3">Register With Us</h2>
                    </div>
                    <br /> <br />
                    <label htmlFor="username">
                        <p className="is-size-5" /> Username:
                        <input
                            id="username"
                            className="input is-large"
                            type="text"
                            value={username}
                            placeholder="Enter username"
                            onChange={handleUsernameChange}
                        />
                    </label>
                    <br />
                    <br />
                    <div>
                        <label htmlFor="password">
                            <p className="is-size-5" /> Password:
                            <input
                                id="password"
                                className="input is-large"
                                type="password"
                                value={password}
                                placeholder="Enter password"
                                onChange={handlePasswordChange}
                            />
                        </label>
                        <br /> <br />
                    </div>
                    <button id="button" type="submit">
                        Register
                    </button>
                    <br />
                    <Link to="/login">Already a user? sign in here</Link>
                    <br /> <br /> <br />
                    <div>
                        {isRegistered && <Link to="/login">Continue</Link>}
                    </div>
                </form>
            </div>
        </div>
    );
}
