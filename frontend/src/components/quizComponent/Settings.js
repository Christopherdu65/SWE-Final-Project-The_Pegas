/* eslint-disable react/prop-types */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-console */
/* eslint-disable react/jsx-filename-extension */
import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import 'bulma/css/bulma.css';
import "./Quiz.css";
import { Ring } from "react-awesome-spinners";


const ErrorComponent = () => {
  <h3>There was an issue with our api request. Try again.</h3>;
};

export default function Settings() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currCategory, setCurrCategory] = useState("");
  const [numQuestions, setNumQuestions] = useState(10);
  const [difficulty, setDifficulty] = useState("");
  const [questionsType, setQuestionsType] = useState("");
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("https://opentdb.com/api_category.php")
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setCategories(data.trivia_categories);
      })
      .catch((error) => {
        console.log(error);
        setHasError(true);
      });
  }, []);

  const handleCurrCategoryChange = (e) => {
    setCurrCategory(e.target.value);
  };
  const handleQuestionsChange = (e) => {
    setNumQuestions(e.target.value);
  };
  const handleDifficultyChange = (e) => {
    setDifficulty(e.target.value);
  };
  const handleTypeChange = (e) => {
    setQuestionsType(e.target.value);
  };

  function ContinueButton() {
    return (
      <Link
        to={{
          pathname: "/quiz",
          state: {
            category: currCategory,
            numQuestions,
            difficulty,
            questionsType,
          },
        }}
      >
        <button className="button is-danger is-large" type="button">Continue!</button>
      </Link>
    );
  }

  if (!loading && !hasError) {
    return (
      <div>
        <br />
        <section className="hero is-danger is-small">
            <div className="hero-body">
              <h1 className="title m-3">The Pegas Quiz</h1>
            </div>
        </section>
        <br />
          
        <form id="settings"> 
          <div className="field">
            <span className="label">Select Category:</span>
            <div className="select is-danger is-small mb-2" >
              <select onChange={handleCurrCategoryChange}>
                <option value="">All</option>
                {categories &&
                  categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <br/>

          <div className="field">
            <span className="label">Enter Number of questions:</span>
              <div className="columns is-centered is-danger">
                <div className="column is-one-fifth">
                  <input
                    className="input is-danger is-small"
                    type="number"
                    min="1"
                    defaultValue={numQuestions}
                    onChange={handleQuestionsChange}
                  />
                </div>
              </div>
          </div>
          <br />

          <div className="field">
            <span className="label">Select Difficulty:</span>
            <div className="select is-danger is-small mb-2" >
              <select value={difficulty} onChange={handleDifficultyChange}>
                <option value="">Any</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>
          <br />

          <div className="field">
            <span className="label">Select Type:</span>
            <div className="select is-danger is-small mb-2">
              <select value={questionsType} onChange={handleTypeChange}>
                <option value="">Any</option>
                <option value="multiple">Multiple Choice</option>
                <option value="boolean">True/False</option>
              </select>
            </div>
          </div>
          <br />

          <ContinueButton />
        </form>
        {hasError && <ErrorComponent />}
      </div>
    );
  }
  return (
    <div>
      <h3>
        Loading that beautiful page for you or maybe not!!
      </h3>
      <Ring />
    </div>
  );
}
