/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-console */
/* eslint-disable react/jsx-filename-extension */
import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
        <button type="button">continue</button>
      </Link>
    );
  }

  if (!loading && !hasError) {
    return (
      <div>
        <h1>The Pegas Quiz</h1>
        <form>
            Select Category:
            <select onChange={handleCurrCategoryChange}>
              <option value="">All</option>
              {categories &&
                categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
            </select>
          <br />
          <br />
            Enter Number of questions:
            <input
              type="number"
              defaultValue={numQuestions}
              onChange={handleQuestionsChange}
            />
          <br />
          <br />
            Select Difficulty:
            <select value={difficulty} onChange={handleDifficultyChange}>
              <option value="">Any</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          <br />
          <br />
            Select Type:
            <select value={questionsType} onChange={handleTypeChange}>
              <option value="">Any</option>
              <option value="multiple">Multiple Choice</option>
              <option value="boolean">True/False</option>
            </select>
          <br />
          <br />
          <ContinueButton />
        </form>
        {hasError && <ErrorComponent />}
      </div>
    );
  }
}
