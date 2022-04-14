/* eslint-disable react/jsx-filename-extension */
// import logo from "./logo.svg";
// import Logout from "./components/logout/Logout";
// import { React, useEffect, useState } from "react";

import React from 'react';
import 'bulma/css/bulma.css';

function Teammembers() {
    return (
        <div>
            <section className="section">
                <h1 className="title">Section</h1>
                <h2 className="subtitle">
                    Christopher Raoul
                </h2>
            </section>
            <section className="section">
                <h1 className="title">Section</h1>
                <h2 className="subtitle">
                    Scott Ross
                </h2>
            </section>
            <section className="section">
                <h1 className="title">Section</h1>
                <h2 className="subtitle">
                    Faith Akosile
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
                </h2>
            </section>
            <section className="section">
                <h1 className="title">Section</h1>
                <h2 className="subtitle">
                    ABout Rushi Patel
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