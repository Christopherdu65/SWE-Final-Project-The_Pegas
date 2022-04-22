/* eslint-disable react/jsx-filename-extension */

import React from "react";
import "bulma/bulma.sass";

import Joyride from "react-joyride";
import { NavLink } from "react-router-dom";

function Walkthrough() {
  const state = {
    steps: [
      {
        target: ".start",
        content:
          "  Got a competive spirit and want to improve click next to get started",
      },
      {
        target: ".playnow",
        content: "Click This Button to Play!",
      },
      {
        target: ".leaderboard",
        content:
          "Got the competitive spirit, Press to check out your competition!",
      },
      {
        target: ".profile",
        content: "Wanna Improve? Click to see your score!",
      },

      {
        target: ".logout",
        content: "Wanna leave click here to log out!",
      },
      {
        target: ".playnow",
        content: (
          <button
            type="button"
            className="button is-success is-danger is-light"
          >
            <NavLink to="/settings">Start Now</NavLink>
          </button>
        ),
      },
    ],
  };

  const { steps } = state;

  return (
    <div className="app">
      <Joyride
        steps={steps}
        showSkipButton
        showProgress
        continuous
        locale
        target
      />
    </div>
  );
}

function Welcome() {
  return (
    <div>
      <div className="navigation">
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Cormorant Garamond"
        />
        <style>
          {
            'body {    background-image: linear-gradient(45deg, whitesmoke, whitesmoke,  #ff0038); min-height: 100vh; font-family: "Cormorant Garamond"; }'
          }
        </style>
        <br /> <br />
        <h1 className="slogan1">Welcome to the Trivia App</h1>
        <br />
        <p id="slogans">Double The Winnings, Double The Trivia</p>
        <section id="slogans">
          Here you can come and perfect your skills! Follow the Walkthrough to
          see how our app works Enjoy Gaming!
        </section>
        <Walkthrough />
      </div>
    </div>
  );
}

export default Welcome;
