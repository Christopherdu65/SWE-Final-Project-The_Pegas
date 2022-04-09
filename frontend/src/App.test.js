/* eslint-disable react/jsx-filename-extension */
import React from "react";
import '@testing-library/jest-dom/extend-expect';
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import App from "./App";
import Quiz from "./components/quizComponent/Quiz";
import Settings from "./components/quizComponent/Settings";

it("App component renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("Settings component renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Router><Settings /></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("Quiz component renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Router><Quiz /></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});