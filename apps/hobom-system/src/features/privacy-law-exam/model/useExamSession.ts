import { useCallback, useMemo, useState } from "react";
import type { ExamQuestion } from "@/entities/privacy-law";

interface AnswerState {
  userAnswer: string;
  revealed: boolean;
}

interface ExamState {
  currentIndex: number;
  answers: AnswerState[];
  finished: boolean;
}

const checkCorrect = (question: ExamQuestion, userAnswer: string): boolean => {
  const normalize = (s: string) => s.trim().replace(/\s+/g, " ");

  return normalize(userAnswer) === normalize(question.answer);
};

const createInitialAnswers = (count: number): AnswerState[] =>
  Array.from({ length: count }, () => ({ userAnswer: "", revealed: false }));

export const useExamSession = (questions: ExamQuestion[]) => {
  const [state, setState] = useState<ExamState>({
    currentIndex: 0,
    answers: createInitialAnswers(questions.length),
    finished: false,
  });

  const currentQuestion = questions[state.currentIndex] as ExamQuestion | undefined;
  const currentAnswer = state.answers[state.currentIndex];
  const userAnswer = currentAnswer?.userAnswer ?? "";
  const revealed = currentAnswer?.revealed ?? false;
  const isCorrect = revealed && currentQuestion ? checkCorrect(currentQuestion, userAnswer) : false;

  const score = useMemo(
    () =>
      state.answers.reduce((acc, ans, i) => {
        if (!ans.revealed) return acc;
        const q = questions[i];

        return q && checkCorrect(q, ans.userAnswer) ? acc + 1 : acc;
      }, 0),
    [state.answers, questions],
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

      if (nextIndex >= questions.length) return { ...prev, finished: true };

      return { ...prev, currentIndex: nextIndex };
    });
  }, [questions.length]);

  const prev = useCallback(() => {
    setState((s) => {
      if (s.currentIndex <= 0) return s;

      return { ...s, currentIndex: s.currentIndex - 1 };
    });
  }, []);

  const reset = useCallback(() => {
    setState({
      currentIndex: 0,
      answers: createInitialAnswers(questions.length),
      finished: false,
    });
  }, [questions.length]);

  return {
    currentIndex: state.currentIndex,
    userAnswer,
    revealed,
    score,
    finished: state.finished,
    currentQuestion,
    isCorrect,
    total: questions.length,
    setAnswer,
    reveal,
    next,
    prev,
    reset,
  };
};
