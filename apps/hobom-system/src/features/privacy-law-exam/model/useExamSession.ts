import { useCallback, useState } from "react";
import type { ExamQuestion } from "@/entities/privacy-law";

interface ExamState {
  currentIndex: number;
  userAnswer: string;
  revealed: boolean;
  score: number;
  finished: boolean;
}

const checkCorrect = (question: ExamQuestion, userAnswer: string): boolean => {
  const normalize = (s: string) => s.trim().replace(/\s+/g, " ");

  return normalize(userAnswer) === normalize(question.answer);
};

export const useExamSession = (questions: ExamQuestion[]) => {
  const [state, setState] = useState<ExamState>({
    currentIndex: 0,
    userAnswer: "",
    revealed: false,
    score: 0,
    finished: false,
  });

  const currentQuestion = questions[state.currentIndex] as
    | ExamQuestion
    | undefined;
  const isCorrect =
    state.revealed && currentQuestion
      ? checkCorrect(currentQuestion, state.userAnswer)
      : false;

  const setAnswer = useCallback((answer: string) => {
    setState((prev) =>
      prev.revealed ? prev : { ...prev, userAnswer: answer },
    );
  }, []);

  const reveal = useCallback(() => {
    setState((prev) => {
      if (prev.revealed || !prev.userAnswer) return prev;
      const question = questions[prev.currentIndex];

      if (!question) return prev;
      const correct = checkCorrect(question, prev.userAnswer);

      return { ...prev, revealed: true, score: prev.score + (correct ? 1 : 0) };
    });
  }, [questions]);

  const next = useCallback(() => {
    setState((prev) => {
      const nextIndex = prev.currentIndex + 1;

      if (nextIndex >= questions.length) return { ...prev, finished: true };

      return {
        ...prev,
        currentIndex: nextIndex,
        userAnswer: "",
        revealed: false,
      };
    });
  }, [questions.length]);

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
    currentQuestion,
    isCorrect,
    total: questions.length,
    setAnswer,
    reveal,
    next,
    reset,
  };
};
