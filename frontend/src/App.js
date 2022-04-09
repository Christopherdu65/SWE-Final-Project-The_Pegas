/* eslint-disable react/jsx-filename-extension */
// import logo from "./logo.svg";
// import { React, useEffect, useState } from "react";
import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Settings from "./components/quizComponent/Settings";
import Quiz from "./components/quizComponent/Quiz";
import Login from "./components/loginComponent/Login";
import Register from "./components/registerComponent/Register";

function App() {
  const [user, setUser] = useState(false);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Settings setUser={setUser} /> : <Login setUser={setUser} />}
        </Route>
        <Route path="/quiz">
          {user ? <Quiz /> : <Login setUser={setUser} />}
        </Route>
        <Route path="/login">
          {user ? <Settings setUser={setUser} /> : <Login setUser={setUser} />}
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
