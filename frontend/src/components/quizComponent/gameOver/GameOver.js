/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disbale react/destructuring-assignment */
/* eslint-disable */

import React from 'react';
import { Link } from "react-router-dom";
import './GameOver.css';

function GameOver(props) {
    const { trigger, quizPts, possiblePts } = props;
    const ratio = quizPts / possiblePts;
    let message = "";

    if (ratio < .25) {
        message = "Wow, not your area of expertise huh?"
    } else if (ratio < .5) {
        message = "Hmm, maybe you should try studying this one..."
    } else if (ratio < .75) {
        message = "Guess you know your stuff."
    } else {
        message = "Wow, good job! You must be an expert on this!"
    }

    return (trigger) ? (
        <div className="gameover">
            <div className="popup">
                <div className="summary">
                    <h2>{message}</h2>

                    <p>
                        You scored {quizPts} out of {possiblePts} points
                    </p>
                </div>

                <div className="buttons">
                    <Link to="/quiz">
                        <button className="play-again" type="button">Play again?</button>
                    </Link>

                    <Link to="/leaderboard">
                        <button className="leaderboard" type="button">See leaderboard!</button>
                    </Link>

                    <Link to="/">
                        <button className="play-different" type="button">Play a different quiz!</button>
                    </Link>
                </div>
            </div>
        </div>
    ) : "";
} 

export default GameOver; 
