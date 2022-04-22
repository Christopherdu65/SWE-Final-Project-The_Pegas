/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from "react";

function LeaderList(props) {
  const { leaders } = props;

  return (
    <div className="leaderlist">
      {leaders.map((leader, index) => (
        <div className="leaderlist-item" key={index}>
          <img
            className="avatar-list"
            src={`https://avatars.dicebear.com/api/human/${leader.username}.svg`}
            aria-hidden
            alt="profile image"
          />
          <h2 className="username-list">{leader.username}</h2>
          <p className="score-list">{leader.score}</p>
        </div>
      ))}
    </div>
  );
}

export default LeaderList;
