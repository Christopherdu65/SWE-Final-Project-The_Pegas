/* eslint-disable react/jsx-filename-extension */
// import logo from "./logo.svg";
// import Logout from "./components/logout/Logout";
// import { React, useEffect, useState } from "react";

import React from 'react';
import 'bulma/css/bulma.css';

function Teammembers() {
    return (
        <div>
            <style>{'body { background:  linear-gradient(45deg, whitesmoke, salmon);  min-height: 100vh; }'}</style>
            <section className="section">
                <h1 className="title">Section</h1>
                <h2 className="subtitle">
                    About Christopher Raoul:
                    <p>Christopher is a computer science major at GSU. Christopher loves the creating and designing new apps.</p>
                </h2>
            </section>
            <section className="section">
                <h1 className="title">Section</h1>
                <h2 className="subtitle">
                    About Scott Ross:
                    <p>Scott is a computer science major at GSU. Scoot loves designing things on the front end. </p>
                </h2>
            </section>
            <section className="section">
                <h1 className="title">Section</h1>
                <h2 className="subtitle">
                    About Faith Akosile
                    <p>Faith Akosile is a computer science major at GSU. Faith loves the creating and designing. In additon, she loves reading in her spare time </p>
                </h2>
            </section>
        </div>
    )

}
function Allteammembers() {
    return (
        <div>
            <section className="section">
                <h1 className="title">Section</h1>
                <h2 className="subtitle">
                    About Harin Pulkaram
                    <p>Harin is a computer science major at GSU who loves the creating new technology. </p>
                </h2>
            </section>
            <section className="section">
                <h1 className="title">Section</h1>
                <h2 className="subtitle">
                    About Rushi Patel
                    <p>Rushi is a computer science major at GSU. Rushi loves the creating and designing new apps. </p>
                </h2>
            </section>
        </div>
    )

}

function Aboutus() {
    return (
        <div>
            <h2 className="is-size-1">Meet The Team</h2>
            <p>The Trivia App is designed by  Christopher Raoul,  Scott Ross, Faith Akosile, Harin Pulkaram, Rushi Patel, </p>
            <Teammembers />
            <Allteammembers />
        </div>

    )
}

export default Aboutus