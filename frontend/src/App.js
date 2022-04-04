import logo from "./logo.svg";
import { React, useEffect, useState } from "react";
import "./App.css";

function App() {
    const [test, setTest] = useState({});

    useEffect(() => {
        fetch("/users/1", {
            headers: {
                accepts: "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setTest(data);
            })
            .catch(() => {
                setTest("failure");
            });
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>Username: {test["username"]}</p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
