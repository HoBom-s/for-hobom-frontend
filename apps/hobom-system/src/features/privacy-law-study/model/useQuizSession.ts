import { useCallback, useState } from "react";
import type { Quiz } from "@/entities/privacy-law";

interface QuizState {
  currentIndex: number;
  userAnswer: string;
  revealed: boolean;
  score: number;
  finished: boolean;
}

const checkCorrect = (quiz: Quiz, userAnswer: string): boolean => {
  const normalize = (s: string) => s.trim().replace(/\s+/g, " ");

  return normalize(userAnswer) === normalize(quiz.answer);
};

export const useQuizSession = (quizzes: Quiz[]) => {
  const [state, setState] = useState<QuizState>({
    currentIndex: 0,
    userAnswer: "",
    revealed: false,
    score: 0,
    finished: false,
  });

  const currentQuiz = quizzes[state.currentIndex] as Quiz | undefined;
  const isCorrect =
    state.revealed && currentQuiz
      ? checkCorrect(currentQuiz, state.userAnswer)
      : false;

  const setAnswer = useCallback((answer: string) => {
    setState((prev) =>
      prev.revealed ? prev : { ...prev, userAnswer: answer },
    );
  }, []);

  const reveal = useCallback(() => {
    setState((prev) => {
      if (prev.revealed || !prev.userAnswer) return prev;
      const quiz = quizzes[prev.currentIndex];

      if (!quiz) return prev;
      const correct = checkCorrect(quiz, prev.userAnswer);

      return { ...prev, revealed: true, score: prev.score + (correct ? 1 : 0) };
    });
  }, [quizzes]);

  const next = useCallback(() => {
    setState((prev) => {
      const nextIndex = prev.currentIndex + 1;

      if (nextIndex >= quizzes.length) return { ...prev, finished: true };

      return {
        ...prev,
        currentIndex: nextIndex,
        userAnswer: "",
        revealed: false,
      };
    });
  }, [quizzes.length]);

  const reset = useCallback(() => {
    setState({
      currentIndex: 0,
      userAnswer: "",
      revealed: false,
      score: 0,
      finished: false,
    });
  }, []);

  return {
    currentIndex: state.currentIndex,
    userAnswer: state.userAnswer,
    revealed: state.revealed,
    score: state.score,
    finished: state.finished,
    currentQuiz,
    isCorrect,
    total: quizzes.length,
    setAnswer,
    reveal,
    next,
    reset,
  };
};
