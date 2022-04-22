/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-filename-extension */

import { React, useState, useEffect } from "react";
import "./Profile.css";
import "bulma/css/bulma.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import categoryMap from "../common/categoryMap";

function StarComponent({ achievements, assignStars }) {
    const numStars = assignStars(achievements);
    switch (numStars) {
        case 1:
            return <FontAwesomeIcon icon={faStar} />;
        case 2:
            return (
                <span>
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                </span>
            );
        case 3:
            return (
                <span>
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                </span>
            );
        case 4:
            return (
                <span>
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                </span>
            );
        case 5:
            return (
                <span>
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                </span>
            );
        default:
            return <span />;
    }
}

function Profile() {
  const [avatar, setAvatar] = useState();
  const [username, setUsername] = useState("");
  const [points, setPoints] = useState();
  const [plays, setPlays] = useState([]);
  const [recents, setRecents] = useState();
  const [achievements, setAchievements] = useState();

  // to-do: fetch current user logged in
  useEffect(() => {
    fetch("api/me", {})
      .then((response) => response.json())
      .then((data) => {
        setUsername(data.username);
        setPoints(Object.entries(data.points));
        setPlays(Object.entries(data.plays));
        setRecents(data.recents.reverse());
        setAvatar(`https://avatars.dicebear.com/api/human/${username}.svg`);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetch("/api/achievements")
      .then((res) => res.json())
      .then((data) => {
        setAchievements(Object.entries(data));
      });
  }, []);

  const assignStars = (arr) => {
    let numStars = 0;
    arr.map((item, i) => {
      if (i < arr.length - 1) {
        if (item[1].plays.length === 1 && item[1].points.length === 1) {
          numStars += 1;
        }
        if (item[1].plays.length === 2 && item[1].points.length === 2) {
          numStars += 1;
        }
        if (item[1].plays.length === 3 && item[1].points.length === 3) {
          numStars += 1;
        }
        if (item[1].plays.length === 4 && item[1].points.length === 4) {
          numStars += 1;
        }
        if (item[1].plays.length === 5 && item[1].points.length === 5) {
          numStars += 1;
        }
      }
      return numStars;
    });
    return numStars;
  };

  return (
    <div className="container box mt-4 mb-4">
      <br />
      <h1 className="title is-1 is-family-monospace">Your Profile</h1>
      <br />
      <br />
      <br />
      <div className="Profile columns">
        <div className="userinfo column is-one-third">
          <img className="avatar" src={avatar} aria-hidden alt="profile-image" />
          <div>
            <p className="is-family-monospace has-text-weight-bold">
              Username: {username}
              {achievements && (
                <StarComponent
                  assignStars={assignStars}
                  achievements={achievements}
                />
              )}
            </p>
            <h5 className="title is-5 has-text-danger is-family-monospace">
              <br />
              Total Score/Category
            </h5>
            {points &&
              points.map((point, index) => (
                <p key={index} className="is-family-monospace">
                  {categoryMap[point[0]]}:
                  <span className="has-text-weight-bold">{point[1]} pts</span>
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
                  <span className="has-text-weight-bold">Category: </span>
                  <span className="has-text-danger">
                    {categoryMap[recent.category]}
                  </span>
                </p>
                <p className="is-family-monospace">
                  <span className="has-text-weight-bold">Score: </span>
                  {recent.score} pts
                </p>
                <p className="is-family-monospace">
                  <span className="has-text-weight-bold">Maxium: </span>
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