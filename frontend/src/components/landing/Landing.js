/* eslint-disable react/jsx-filename-extension */
// import logo from "./logo.svg";
// import Logout from "./components/logout/Logout";
// import { React, useEffect, useState } from "react";
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
import 'bulma/css/bulma.css';
import "./Landing.css";

function MeetUs() {
    return (
        <div>
            <br />
            <a name="creators"></a>
            <h2 className="center">Meet The developers</h2>
            <div className='row' >
                <div className="column">
                    <div className="card">
                        <img id="minion1" src="../image/minion6.jpg" alt="Christopher" />

                        <div className="container">
                            <h2>Christopher Raoul</h2>
                            <p className="title">Developer</p>
                        </div>
                    </div>
                </div>

                <div className="column">
                    <div className="card">
                        <img id="minion1" src="../image/minion1.jpeg" alt="Scott" />
                        <div className="container">
                            <h2>Scott Ross</h2>
                            <p className="title">Developer</p>
                        </div>
                    </div>
                </div>
                <div className="column">
                    <div className="card">
                        <img id="profilepic1" src="../image/minion3.jpeg" alt="Faith" />
                        <div className="container">
                            <h2>Faith Akosile</h2>
                            <p className="title">Developer</p>

                        </div>
                    </div>
                </div>
                <div className="column">
                    <div className="card">
                        <img id="profilepic" src="../image/minion5.jpg" alt="Jane" />
                        <div className="container">
                            <h2>Harin Pulkaram</h2>
                            <p className="title">Developer</p>
                        </div>
                    </div>
                </div>
                <div className="column">
                    <div className="card">
                        <img id="profilepic" src="../image/minion2.jpg" alt="Rushi" />
                        <div className="container">
                            <h2>Rushi Patel</h2>
                            <p className="title">Developer</p>
                        </div>
                    </div>
                </div>


            </div>
        </div >

    )
}
function ContactUs() {
    return (
        <div>
            <br />

            <div className='row' >
                <a name="contactus"></a>
                <h2 className="center">Contact us</h2>

                Contact The Developers at:
                <br />
                Christopher Raoul: mchristopherraoul1@student.gsu.edu
                <br />
                Scott Ross: sross47@student.gsu.edu
                <br />
                Faith Akosile: fakosile1@student.gsu.edu
                <br />
                Harin Pulkaram: hpulkaram1@student.gsu.edu
                <br />
                Rushi Patel: rpatel225@student.gsu.edu


            </div>

        </div >
    )

}


function Landing() {
    return (
        <div className="font-effect-shadow-multiple">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Cormorant Garamond" />
            <style>{'body {   font-family: "Cormorant Garamond"; }'}</style>
            <br />
            <div  >
                <div className="center">
                    <img className="rotate" src="../image/trivia1.jpg" alt="trivia" />
                    <br />
                    <h2 className="slogan">Double The Winnings, Double The Trivia</h2>

                    <a href="#about"><button type="button" className="button is-success is-light is-large">Learn More!</button></a>

                    <br />
                </div>
                <br />

                <div className='row'>
                    <a name="about" />
                    <h1 className="center">About</h1>
                    <img className='image' src="../image/aboutimage.jpg" alt="trivia" />
                    <div>
                        <p className="aboutparagraph"> <span className="tab"></span> Trivia is a memory game where participants are asked questions about various topic, and participants must answer
                            as many of
                            <br />
                            correctly. The game provides multiple subjects for the players to choose from and has a various levels of difficulty depending on
                            <br /> how challenging players want the questions to be. Futher, this game can allow players to view the leaderboard of all our users.
                            <br />
                            The Trivia app is created for players to have fun while playing.
                            Its foremost goal is to encourage conversation and facilitate
                            <br />
                            a good argument among participants and the advantage of developing and growing your knowledge, whether in
                            <br />
                            general or in more particular areas. Trivia players can view their scores on the leader board and compete for 1st place
                            <br />
                            because <strong>Double The Winnings, Double The Trivia</strong>.

                        </p>
                    </div>

                </div>

                <br />
                <br />

            </div>

            <section>
                <div>

                    <MeetUs />

                </div>
            </section>
            <br />
            <br />

            <section>
                <div>
                    <ContactUs />
                    <a href="/"><button type="button" className="button is-success is-light is-large">Go Back to the Top</button></a>


                </div>
            </section>

        </div >

    )

}
export default Landing;
