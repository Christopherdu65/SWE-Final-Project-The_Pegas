/* eslint-disable react/no-array-index-key */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-danger */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable jsx-a11y/control-has-associated-label */

import { React, useState, useEffect } from "react";
import { withRouter } from "react-router";
import "./Quiz.css";
import { useAlert } from "react-alert";
import GameOver from "./gameOver/GameOver";

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
  const alert = useAlert();

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
  }, []);

  useEffect(() => {
    if (!quiz[currIndex] && currIndex > 0) {
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
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.success)
            alert.show("There was an error while saving your score");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [currIndex]);

  return (
    <div className="is-center mt-6">
      {!hasError && quiz[currIndex] && (
        <div id="question-choices">
          <section className="hero is-danger">
            <div className="hero-body">
              <h1
                className="title"
                dangerouslySetInnerHTML={{ __html: quiz[currIndex].question }}
              />
              <h1
                className="subtitle"
                dangerouslySetInnerHTML={{
                  __html: `difficulty: ${  quiz[currIndex].difficulty}`,
                }}
              />
            </div>
          </section>
          {quiz[currIndex].choices.map((choice, index) => (
            <div className="columns mt-6">
              <div className="column">
                <button
                  className="button is-danger is-large is-light is-fullwidth"
                  key={index}
                  type="button"
                  onClick={pickAnswer}
                  dangerouslySetInnerHTML={{ __html: choice }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
      {!hasError && !quiz[currIndex] && (
        <div>
          <GameOver
            trigger
            quizPts={quizPts}
            possiblePts={possiblePts}
          />
        </div>
      )}
      {hasError && <ErrorComponent />}
    </div>
  );
}
export default withRouter(Quiz);
