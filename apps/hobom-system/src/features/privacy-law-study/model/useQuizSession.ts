import { useCallback, useMemo, useState } from "react";
import type { Quiz } from "@/entities/privacy-law";

interface AnswerState {
  userAnswer: string;
  revealed: boolean;
}

interface QuizState {
  currentIndex: number;
  answers: AnswerState[];
  finished: boolean;
}

const checkCorrect = (quiz: Quiz, userAnswer: string): boolean => {
  const normalize = (s: string) => s.trim().replace(/\s+/g, " ");

  return normalize(userAnswer) === normalize(quiz.answer);
};

const createInitialAnswers = (count: number): AnswerState[] =>
  Array.from({ length: count }, () => ({ userAnswer: "", revealed: false }));

export const useQuizSession = (quizzes: Quiz[]) => {
  const [state, setState] = useState<QuizState>({
    currentIndex: 0,
    answers: createInitialAnswers(quizzes.length),
    finished: false,
  });

  const currentQuiz = quizzes[state.currentIndex];
  const currentAnswer = state.answers[state.currentIndex];
  const userAnswer = currentAnswer?.userAnswer ?? "";
  const revealed = currentAnswer?.revealed ?? false;
  const isCorrect = revealed && currentQuiz ? checkCorrect(currentQuiz, userAnswer) : false;

  const score = useMemo(
    () =>
      state.answers.reduce((acc, ans, i) => {
        if (!ans.revealed) return acc;
        const q = quizzes[i];

        return q && checkCorrect(q, ans.userAnswer) ? acc + 1 : acc;
      }, 0),
    [state.answers, quizzes],
  );

  const setAnswer = useCallback((answer: string) => {
    setState((prev) => {
      const current = prev.answers[prev.currentIndex];

      if (!current || current.revealed) return prev;
      const answers = [...prev.answers];

      answers[prev.currentIndex] = { ...current, userAnswer: answer };

      return { ...prev, answers };
    });
  }, []);

  const reveal = useCallback(() => {
    setState((prev) => {
      const current = prev.answers[prev.currentIndex];

      if (!current || current.revealed || !current.userAnswer) return prev;
      const answers = [...prev.answers];

      answers[prev.currentIndex] = { ...current, revealed: true };

      return { ...prev, answers };
    });
  }, []);

  const next = useCallback(() => {
    setState((prev) => {
      const nextIndex = prev.currentIndex + 1;

      if (nextIndex >= quizzes.length) return { ...prev, finished: true };

      return { ...prev, currentIndex: nextIndex };
    });
  }, [quizzes.length]);

  const prev = useCallback(() => {
    setState((s) => {
      if (s.currentIndex <= 0) return s;

      return { ...s, currentIndex: s.currentIndex - 1 };
    });
  }, []);

  const reset = useCallback(() => {
    setState({
      currentIndex: 0,
      answers: createInitialAnswers(quizzes.length),
      finished: false,
    });
  }, [quizzes.length]);

  return {
    currentIndex: state.currentIndex,
    userAnswer,
    revealed,
    score,
    finished: state.finished,
    currentQuiz,
    isCorrect,
    total: quizzes.length,
    setAnswer,
    reveal,
    next,
    prev,
    reset,
  };
};
