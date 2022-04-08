import { React } from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Profile from "./components/profile/Profile";
import Leaderboard from "./components/leaderboard/Leaderboard";

function App() {

    return (
            <div className="App">
                <Navbar/>

                <Leaderboard/>

                <Profile/>

            </div>
    );
}

export default App;
