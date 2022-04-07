import { React, useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import Leaderboard from "./components/Leaderboard";

function App() {
    /*const [test, setTest] = useState({});

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
    }, []);*/

    return (
            <div className="App">
                <Navbar/>

                <Leaderboard/>

                <Profile/>

            </div>
    );
}

export default App;
