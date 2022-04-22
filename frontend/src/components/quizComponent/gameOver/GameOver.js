/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disbale react/destructuring-assignment */
/* eslint-disable */

import React from "react";
import { Link } from "react-router-dom";
import "./GameOver.css";
import "bulma/css/bulma.css";

function GameOver(props) {
  const { trigger, quizPts, possiblePts } = props;
  const ratio = quizPts / possiblePts;
  let message = "";

  if (ratio < 0.25) {
    message = "Wow, not your area of expertise huh?";
  } else if (ratio < 0.5) {
    message = "Hmm, maybe you should try studying this one...";
  } else if (ratio < 0.75) {
    message = "Guess you know your stuff.";
  } else {
    message = "Wow, good job! You must be an expert on this!";
  }

  return trigger ? (
    <div className="gameover">
      <div className="popup">
        <div className="summary">
          <h2>{message}</h2>
          <br />
          <p>
            You scored {quizPts} out of {possiblePts} points!
          </p>
          <br />
          <h2 className="has-text-weight-bold has-text-danger">
            {Math.round(ratio * 100)}%
          </h2>
          <br />
        </div>

        <div className="buttons tags is-centered">
          <Link to="/settings">
            <button
              className="play-again"
              type="button button is-danger is-rounded"
            >
              Play another quiz?
            </button>
          </Link>

          <Link to="/leaderboard">
            <button
              className="leaderboard"
              type="button my-3 button is-danger is-rounded"
            >
              See leaderboard!
            </button>
          </Link>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default GameOver;
