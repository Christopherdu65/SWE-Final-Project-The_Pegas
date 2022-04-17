/* eslint-disable react/jsx-filename-extension */
// import logo from "./logo.svg";

// import { React, useEffect, useState } from "react";

import React from 'react';

function Walkthrough() {
    return (
        <div>
            <section className="left">
                Please press Play Now to start your game
            </section>
            <section className="right">
                Click profile to check your current stats
            </section>
            <section>
                Up here

            </section>
        </div>

    )
}
function Welcome() {

    return (
        <div>
            <div className="navigation">
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Cormorant Garamond" />
                <style>{'body {   font-family: "Cormorant Garamond"; }'}</style>
                <h2 className="slogan">Welcome to Trivia App</h2>
                <p id="slogan">Double The Winnings, Double The Trivia</p>
                <Walkthrough />

            </div>


        </div >
    )

}
export default Welcome;