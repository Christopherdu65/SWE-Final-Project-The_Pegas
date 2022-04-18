/* eslint-disable react/jsx-filename-extension */
// import logo from "./logo.svg";
// import Logout from "./components/logout/Logout";
// import { React, useEffect, useState } from "react";
import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Settings from "./components/quizComponent/Settings";
import Quiz from "./components/quizComponent/Quiz";
import Login from "./components/loginComponent/Login";
import Register from "./components/registerComponent/Register";
import Profile from "./components/profile/Profile";
import Leaderboard from "./components/leaderboard/Leaderboard";
import Navbar from "./components/navbar/Navbar";
import Welcome from "./components/welcome/Welcome";
import Landing from "./components/landing/Landing";


function App() {
  const [user, setUser] = useState(false);
  return (
    <Router>
      <Navbar user={user} setUsers={setUser} />
      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>
        <Route path="/settings">
          {user ? <Settings /> : <Login setUser={setUser} />}
        </Route>
        <Route path="/leaderboard">
          <Leaderboard />
        </Route>
        <Route path="/welcome">
          {user ? <Welcome /> : <Login setUser={setUser} />}
        </Route>
        <Route path="/quiz">
          {user ? <Quiz /> : <Login setUser={setUser} />}
        </Route>
        <Route path="/profile">
          {user ? <Profile /> : <Login setUser={setUser} />}
        </Route>

        <Route path="/login">
          {user ? <Welcome setUser={setUser} /> : <Login setUser={setUser} />}
        </Route>
        <Route path="/register">
          {user ? (
            <Settings setUser={setUser} />
          ) : (
            <Register setUser={setUser} />
          )}
        </Route>
      </Switch>
    </Router>
  );
}
export default App;
