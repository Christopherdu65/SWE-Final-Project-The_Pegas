/* eslint-disable no-undef */
/* eslint-disable react/jsx-filename-extension */
import React from "react";
import '@testing-library/jest-dom/extend-expect';
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { render, screen } from "@testing-library/react";
import App from "./App";
import Quiz from "./components/quizComponent/Quiz";
import Settings from "./components/quizComponent/Settings";
import Profile from "./components/profile/Profile";

it("App component renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <AlertProvider template={AlertTemplate}>
      <App />
    </AlertProvider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it("Settings component renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Router><Settings /></Router>, div);
  ReactDOM.render(
    <Router>
      <Settings />
    </Router>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it("Quiz component renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Router><Quiz /></Router>, div);
  ReactDOM.render(
    <Router>
      <Quiz />
    </Router>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
}); 

test("Settings mounts with default text", () => {
  render(
    <AlertProvider template={AlertTemplate}>
      <Router>
        <Settings />
      </Router>
    </AlertProvider>
  );
  const defaultText = screen.getByText(/Loading that beautiful page for you or maybe not!!/i);
  expect(defaultText).toBeInTheDocument();
});

test("Profile component columns shows on the screen", () => {
  render(
    <AlertProvider template={AlertTemplate}>
      <Router>
        <Profile />
      </Router>
    </AlertProvider>
  );
  const playtimeText = screen.getByText(/Total Score\/Category/i);
  const recentText = screen.getByText(/Your Recent quizzes:/i);
  expect(playtimeText).toBeInTheDocument();
  expect(recentText).toBeInTheDocument();
});