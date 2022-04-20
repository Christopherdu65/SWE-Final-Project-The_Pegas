/* eslint-disable no-console */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from "react";
import "./Profile.css";
import "bulma/css/bulma.min.css";
import categoryMap from "../common/categoryMap";

function Profile() {
    const [avatar, setAvatar] = useState();
    const [username, setUsername] = useState("");
    const [points, setPoints] = useState();
    const [plays, setPlays] = useState([]);
    const [recents, setRecents] = useState();

    // to-do: fetch current user logged in
    useEffect(() => {
        fetch("api/me", {})
            .then((response) => response.json())
            .then((data) => {
                setUsername(data.username);
                setPoints(Object.entries(data.points));
                setPlays(Object.entries(data.plays));
                setRecents(data.recents);
                setAvatar(
                    `https://avatars.dicebear.com/api/human/${username}.svg`
                );
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <div className="container box mt-4 mb-4">
            <br />
            <h1 className="title is-1 is-family-monospace">Your Profile</h1>
            <br />
            <br />
            <br />

            <div className="Profile columns">
                <div className="userinfo column is-one-third">
                    <img className="avatar" src={avatar} alt="profile image" />
                    <div>
                        <p className="is-family-monospace has-text-weight-bold">
                            Username: {username}
                        </p>
                        <h5 className="title is-5 has-text-danger is-family-monospace">
                            <br />
                            Total Score/Category
                        </h5>
                        {points &&
                            points.map((point, index) => (
                                <p key={index} className="is-family-monospace">
                                    {categoryMap[point[0]]}:
                                    <span className="has-text-weight-bold">
                                        {point[1]} pts
                                    </span>
                                </p>
                            ))}
                    </div>
                </div>
                <div className="column is-one-third">
                    <h5 className="title is-5 has-text-danger is-family-monospace">
                        Your Playtime/Category
                    </h5>
                    {plays.map((item, index) => (
                        <div key={index}>
                            <p className="is-family-monospace">
                                <span className="has-text-weight-bold">
                                    {categoryMap[item[0]]}:
                                </span>
                                {item[1]} plays
                            </p>
                            <hr />
                        </div>
                    ))}
                    <br />
                </div>
                <div className="column is-one-third">
                    <h5 className="title is-5 has-text-danger is-family-monospace">
                        Your Recent quizzes:
                    </h5>
                    {recents &&
                        recents.map((recent, index) => (
                            <div key={index}>
                                <p className="is-family-monospace">
                                    <span className="has-text-weight-bold">
                                        Category:{" "}
                                    </span>
                                    <span className="has-text-danger">
                                        {categoryMap[recent.category]}
                                    </span>
                                </p>
                                <p className="is-family-monospace">
                                    <span className="has-text-weight-bold">
                                        Score:{" "}
                                    </span>
                                    {recent.score} pts
                                </p>
                                <p className="is-family-monospace">
                                    <span className="has-text-weight-bold">
                                        Maxium:{" "}
                                    </span>
                                    {recent.maximum} pts
                                </p>
                                <hr />
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}

export default Profile;
