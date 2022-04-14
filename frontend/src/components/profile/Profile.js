/* eslint-disable no-console */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from "react";
import "./Profile.css";

function Profile() {
  const [avatar, setAvatar] = useState();
  const [username, setUsername] = useState("");
  const [points, setPoints] = useState();
  const [plays, setPlays] = useState([]);
  const [recents, setRecents] = useState();

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

  //   const mapIdToName = (obj) => {
  //     const res = {}
  //     Object.keys(obj).map((item, i) => (

  //     ))

  //   }
  return (
    <div className="Profile">
      <div className="userinfo">
        <img className="avatar" src={avatar} alt="profile image" />
        <div>
          <p>Username: {username}</p>
          <h2>Total Score per category</h2>
          {points &&
            points.map((point, index) => (
              <p key={index}>
                {CATEGORY_MAPPER[point[0]]}: {point[1]}
              </p>
            ))}
          {/* <p>Total points: {points}</p> */}
        </div>
      </div>
      <h2>Your Playtime per category</h2>
      {plays.map((item, index) => (
        <p key={index}>
          {CATEGORY_MAPPER[item[0]]}: {item[1]}
        </p>
      ))}
      <br />
      <h2>Your Recent quizzes:</h2>
      {recents &&
        recents.map((recent, index) => (
          <div key={index}>
            <p>Category: {CATEGORY_MAPPER[recent.category]}</p>
            <p>Score:{recent.score}</p>
            <p>Maxium:{recent.maximum}</p>
          </div>
        ))}
    </div>
  );
}

export default Profile;
