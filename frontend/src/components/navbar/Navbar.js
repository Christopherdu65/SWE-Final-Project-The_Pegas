/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import "./Navbar.css";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h1>Trivia App</h1>
      <li className="left">
        <NavLink to="/">Home</NavLink>
      </li>

      <li className="left">
        <NavLink to="/quiz">Quizzes</NavLink>
      </li>

      <li className="left">
        <NavLink to="/leaderboard">Leaderboard</NavLink>
      </li>

      <li className="right">
        <NavLink to="/">Profile</NavLink>
      </li>
    </nav>
  );
}

export default Navbar;
