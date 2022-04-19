/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from "react";
import "./Profile.css";
import "bulma/css/bulma.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

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
        </span>
      );
    default:
      return (
        <span />
      );
  }
}

function Profile() {
  const [avatar, setAvatar] = useState();
  const [username, setUsername] = useState("");
  const [points, setPoints] = useState();
  const [plays, setPlays] = useState([]);
  const [recents, setRecents] = useState();
  const [achievements, setAchievements] = useState();


  const CATEGORY_MAPPER = {
    0: "Random",
    1: "All",
    9: "General Knowledge",
    10: "Entertainment: Books",
    11: "Entertainment: Film",
    12: "Entertainment: Music",
    13: "Entertainment: Musicals & Theatres",
    14: "Entertainment: Television",
    15: "Entertainment: Video Games",
    16: "Entertainment: Board Games",
    17: "Science & Nature",
    18: "Science: Computers",
    19: "Science: Mathematics",
    20: "Mythology",
    21: "Sports",
    22: "Geography",
    23: "History",
    24: "Politics",
    25: "Art",
    26: "Celebrities",
    27: "Animals",
    28: "Vehicles",
    29: "Entertainment: Comics",
    30: "Science: Gadgets",
    31: "Entertainment: Japanese Anime & Manga",
    32: "Entertainment: Cartoon & Animations",
  };

  // to-do: fetch current user logged in
  useEffect(() => {
    fetch("api/me", {})
      .then((response) => response.json())
      .then((data) => {
        setUsername(data.username);
        setPoints(Object.entries(data.points));
        setPlays(Object.entries(data.plays));
        setRecents(data.recents);
        setAvatar(`https://avatars.dicebear.com/api/human/${username}.svg`);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetch("/api/achievements")
      .then((res) => res.json())
      .then((data) => {
        setAchievements(Object.entries(data));
        // console.log(Object.entries(data)[2][1].plays.length)
      });
  }, []);

  const assignStars = (arr) => {
    let numStars = 0;
    arr.map((item, i) => {
      if (i < arr.length - 1) {
        // console.log(`this is index ${i}`)
        // stars+=1;
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
          <img className="avatar" src={avatar} alt="profile image" />
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
                  {CATEGORY_MAPPER[point[0]]}:
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
                  {CATEGORY_MAPPER[item[0]]}:
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
                    {CATEGORY_MAPPER[recent.category]}
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
