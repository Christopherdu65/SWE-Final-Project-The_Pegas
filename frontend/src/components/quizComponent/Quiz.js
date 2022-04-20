/* eslint-disable no-alert */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/jsx-filename-extension */
import { React, useState, useEffect } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import "./Quiz.css";

function ErrorComponent() {
  return <h3>There was an issue calling the api</h3>;
}
function Quiz({ location }) {
  // if user did not go through the settings page, then we will use default settings from open trivia db
  const { category, numQuestions, difficulty, questionsType } =
    location.state || {};
  const [quiz, setQuiz] = useState([]);
  const [currIndex, setCurrIndex] = useState(0);
  const [quizPts, setQuizPts] = useState(0);
  const [possiblePts, setPossiblePts] = useState(0);
  const [hasError, setHasError] = useState(false);

  const shuffle = (arr) => {
    const shuffledArr = arr
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

    return shuffledArr;
  };

  const assignPts = (questType) => {
    switch (questType) {
      case "easy":
        setQuizPts(quizPts + 1);
        break;
      case "medium":
        setQuizPts(quizPts + 3);
        break;
      case "hard":
        setQuizPts(quizPts + 5);
        break;
      default:
    }
  };

  const countPossiblePts = (questType) => {
    switch (questType) {
      case "easy":
        setPossiblePts(possiblePts + 1);
        break;
      case "medium":
        setPossiblePts(possiblePts + 3);
        break;
      case "hard":
        setPossiblePts(possiblePts + 5);
        break;
      default:
    }
  };

  const pickAnswer = (e) => {
    const userAnswer = e.target.outerText;
    if (userAnswer === quiz[currIndex].answer) {
      assignPts(quiz[currIndex].difficulty);
    }
    countPossiblePts(quiz[currIndex].difficulty);
    setCurrIndex(currIndex + 1);
  };

  useEffect(() => {
    if (location.state) {
      fetch(
        `https://opentdb.com/api.php?amount=${numQuestions}&category=${category}&difficulty=${difficulty}&type=${questionsType}`
      )
        .then((res) => res.json())
        .then((data) => {
          setQuiz(
            data.results.map((currQuestion) => ({
              question: currQuestion.question,
              difficulty: currQuestion.difficulty,
              choices: shuffle([
                ...currQuestion.incorrect_answers,
                currQuestion.correct_answer,
              ]),
              answer: currQuestion.correct_answer,
            }))
          );
        })
        .catch((error) => {
          console.log(error);
          setHasError(true);
        });
    } else {
      fetch(`https://opentdb.com/api.php?amount=10`)
        .then((res) => res.json())
        .then((data) => {
          setQuiz(
            data.results.map((currQuestion) => ({
              question: currQuestion.question,
              difficulty: currQuestion.difficulty,
              choices: shuffle([
                ...currQuestion.incorrect_answers,
                currQuestion.correct_answer,
              ]),
              answer: currQuestion.correct_answer,
            }))
          );
        })
        .catch((error) => {
          console.log(error);
          setHasError(true);
        });
    }
  }, [category, difficulty, numQuestions, location.state, questionsType]);

  useEffect(() => {
    if (currIndex === numQuestions) {
      // if(location.state){
      const currCategory = category || 1;
      fetch(`/api/quiz`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: currCategory,
          score: quizPts,
          maximum: possiblePts,
        }),
      }).then(res => res.json())
        .then((data) => {
          if (!data.success)
            alert("There was an error while saving your score");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
  return (
    <div>
      {!hasError && quiz[currIndex] && (
        <div>
          <h3 dangerouslySetInnerHTML={{ __html: quiz[currIndex].question }} />
          {quiz[currIndex].choices.map((choice, index) => (
            <button
              key={index}
              type="button"
              onClick={pickAnswer}
              dangerouslySetInnerHTML={{ __html: choice }}
            />
          ))}
        </div>
      )}
      {!hasError && (currIndex === numQuestions || currIndex === 10) && (
        <div>
          <p>
            You scored {quizPts} out of {possiblePts} points
          </p>
          <Link to="/">
            <button type="button">Play Again</button>
          </Link>
        </div>
      )}
      {hasError && <ErrorComponent />}
    </div>
  );
}
export default withRouter(Quiz);
