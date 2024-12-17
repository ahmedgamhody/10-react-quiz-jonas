import { useEffect } from "react";
import { useQuiz } from "../contexts/QuizProvider";

export default function Timer() {
  const { dispatch, secondsRemaining } = useQuiz();
  const mins = Math.floor(secondsRemaining / 60);
  const secs = secondsRemaining % 60;
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);
    return () => clearInterval(interval);
  }, [dispatch]);
  return (
    <div className="timer">{`${mins}:${secs < 10 ? `0${secs}` : secs}`}</div>
  );
}
