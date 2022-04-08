import "./Navbar.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Profile from "../profile/Profile";

const Navbar = () => {
    return (
        <Router>
        <nav className="navbar">
            <h1>Trivia App</h1>
            <li className="left">
                Home
            </li>

            <li className="left">
                Quizzes
            </li>

            <li className="left">
                Leaderboard
            </li>

            <li className="right">
                Profile
            </li>

            <li className="right">
                Logout
            </li>
        </nav>
        </Router>
    )
}

export default Navbar;