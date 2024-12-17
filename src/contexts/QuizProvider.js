import { createContext, useContext, useEffect, useReducer } from "react";
const SECS_PER_QUESTION = 30;

const initialState = {
  status: "loading",
  questions: [],
  question_number: 0,
  points: 0,
  answer: null,
  highscore: 0,
  secondsRemaining: null,
};
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start": {
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    }
    case "nextQuestion": {
      return {
        ...state,
        question_number: state.question_number + 1,
        answer: null,
      };
    }

    case "newAnswer": {
      return {
        ...state,
        answer: action.payload,
      };
    }
    case "correctAnswer": {
      return {
        ...state,
        points: state.points + action.payload,
      };
    }
    case "restart": {
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
      };
    }
    case "finish": {
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    }
    case "tick": {
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    }
    default:
      return state;
  }
}
const QuizContext = createContext();
export default function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    status,
    questions,
    question_number,
    answer,
    points,
    highscore,
    secondsRemaining,
  } = state;
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );
  async function getQuestions() {
    try {
      const res = await fetch("http://localhost:5005/questions");
      const data = await res.json();
      dispatch({ type: "dataReceived", payload: data });
    } catch (error) {
      dispatch({ type: "dataFailed" });
    }
  }
  useEffect(() => {
    getQuestions();
  }, []);
  return (
    <QuizContext.Provider
      value={{
        numQuestions,
        maxPossiblePoints,
        status,
        questions,
        question_number,
        answer,
        points,
        highscore,
        secondsRemaining,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
}

export { useQuiz };
