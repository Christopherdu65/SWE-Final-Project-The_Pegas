const QuizList = (props) => {
    const quizzes = props.quizzes;
    console.log(quizzes)

    return (
        <div className="quizlist">
           { quizzes.map((quiz) => (
                <div className="quizlist-item">
                    <h2 className="category">{quiz.category}</h2>
                    <p className="score">{quiz.score}</p> 
                    <p className="max">{quiz.maximum}</p> 
                </div>
            ))}
        </div>
    );
}

export default QuizList;