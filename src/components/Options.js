import { useQuiz } from "../contexts/QuizProvider";

export default function Options({ question }) {
  const { dispatch, answer } = useQuiz();
  const hasAnswered = answer !== null;
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            hasAnswered
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={index}
          onClick={() => {
            dispatch({ type: "newAnswer", payload: index });
            if (question.correctOption === index) {
              dispatch({
                type: "correctAnswer",
                payload: question.points,
              });
            }
          }}
          disabled={hasAnswered}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
