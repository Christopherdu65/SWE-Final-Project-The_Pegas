/* eslint-disable react/jsx-filename-extension */
// import logo from "./logo.svg";
// import Logout from "./components/logout/Logout";
// import { React, useEffect, useState } from "react";

import React from 'react';
import 'bulma/css/bulma.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="content has-text-centered">
                <p>
                    This app is created by Christopher Raoul,  Scott Ross, Faith Akosile,  Harin Pulkaram, Rushi Patel
                </p>
            </div>
        </footer>

    )
}

function Landing() {

    return (
        <div>
            <div className="navigation">
                <style>{'body { background-color: white;  min-height: 100vh }'} </style>
                <h1 className="is-size-1">Welcome to Trivia App</h1>
                <h1 className="is-size-1">Come and improve your Trivia skills</h1>
            </div>
            <section className="section">
                <h1 className="title">Section</h1>
                <h2 className="subtitle">
                    About US
                </h2>
            </section>
            <section className="section">
                <h1 className="title">Section</h1>
                <h2 className="subtitle">
                    Fun stuff
                </h2>
            </section>
            <section className="section">
                <h1 className="title">Section</h1>
                <h2 className="subtitle">
                    fun stuff2?
                </h2>
            </section>
            <div>
                <Footer />
            </div>

        </div >

    )

}
export default Landing;