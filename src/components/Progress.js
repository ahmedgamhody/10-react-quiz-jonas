import { useQuiz } from "../contexts/QuizProvider";

export default function Progress() {
  const { numQuestions, answer, question_number, points, maxPossiblePoints } =
    useQuiz();
  return (
    <header className="progress">
      <progress
        max={numQuestions}
        value={question_number + Number(answer !== null)}
      />
      <p>
        Question <strong>{question_number + 1}</strong> / {numQuestions}
      </p>

      <p>
        <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </header>
  );
}
