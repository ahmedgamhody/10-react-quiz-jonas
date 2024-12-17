import { useQuiz } from "../contexts/QuizProvider";
import Options from "./Options";

export default function Question() {
  const { questions, question_number } = useQuiz();
  const question = questions.at(question_number);
  return (
    <div>
      <h4>{questions.question}</h4>
      <Options question={question} />
    </div>
  );
}
