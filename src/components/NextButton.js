import React from "react";
import { useQuiz } from "../contexts/QuizProvider";

export default function NextButton() {
  const { dispatch, answer, numQuestions, question_number } = useQuiz();
  if (answer === null) return null;
  if (question_number < numQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => {
          dispatch({ type: "nextQuestion" });
        }}
      >
        Next Question
      </button>
    );
  }
  if (question_number === numQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => {
          dispatch({ type: "finish" });
        }}
      >
        Finish
      </button>
    );
  }
}
