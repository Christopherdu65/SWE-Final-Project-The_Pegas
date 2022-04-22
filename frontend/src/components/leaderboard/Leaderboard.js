/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable react/jsx-filename-extension */
import { React, useState, useEffect } from "react";
import Select from "react-select";
import LeaderList from "./LeaderList";
import "./Leaderboard.css";
import categoryMap from "../common/categoryMap";

function Leaderboard({ setUser }) {
  const [leaders, setLeaders] = useState([]);
  const [category, setCategory] = useState(0);

  useEffect(() => {
    fetch(`/api/leaderboard?category=${category}`, {})
      .then((response) => response.json())
      .then((response) => {
        setLeaders(response.results);
      })
      .catch((error) => console.log(error));
  }, [category]);

  useEffect(() => {
    fetch(`api/me`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUser(true);
        }
      });
  });

  const options = Object.entries(categoryMap).map(([key, value]) => ({
    value: key,
    label: value,
  }));

  return (
    <div className="board">
      <h1>Leaderboard</h1>

      <center>
        <Select
          className="selectcat"
          options={options}
          placeholder="Pick a category!"
          onChange={(value) => {
            setCategory(value.value);
          }}
        />
      </center>

      <div className="list">
        <LeaderList leaders={leaders} />
      </div>
    </div>
  );
}

export default Leaderboard;
