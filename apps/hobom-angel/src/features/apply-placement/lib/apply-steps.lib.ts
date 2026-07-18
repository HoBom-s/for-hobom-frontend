import type { AdoptionAnswer } from "@/entities/adoption";
import type { Question } from "@/entities/questionnaire";

export type AnswerMap = Record<string, string[]>;

/** A question counts as answered when it has a non-empty value (text trimmed). */
export const isAnswered = (question: Question, values: string[] | undefined): boolean => {
  if (!values || values.length === 0) return false;
  if (question.type === "TEXT") return (values[0]?.trim().length ?? 0) > 0;

  return true;
};

/** Whether a single question still needs an answer to advance past its step. */
export const isStepBlocked = (question: Question, answers: AnswerMap): boolean =>
  question.required && !isAnswered(question, answers[question.id]);

/** Build the submit payload — only questions with a real answer are sent. */
export const toAnswerList = (questions: Question[], answers: AnswerMap): AdoptionAnswer[] =>
  questions
    .map((question) => ({
      questionId: question.id,
      values: (answers[question.id] ?? []).map((value) => value.trim()).filter(Boolean),
    }))
    .filter((answer) => answer.values.length > 0);
