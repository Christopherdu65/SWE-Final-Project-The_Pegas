import "./Navbar.css";
import { BrowserRouter as Router, NavLink} from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>Trivia App</h1>
            <li className="left">
                <NavLink to="/">
                    Home
                </NavLink>
            </li>

            <li className="left">
                <NavLink to="/quizzes">
                    Quizzes
                </NavLink>
            </li>

            <li className="left">
                <NavLink to="/leaderboard">
                    Leaderboard
                </NavLink>
            </li>

            <li className="right">
                <NavLink to="/logout">
                    Logout
                </NavLink>
            </li>
            
            <li className="right">
                <NavLink to="/profile">
                    Profile
                </NavLink>
            </li>

        </nav>
    )
}

export default Navbar;