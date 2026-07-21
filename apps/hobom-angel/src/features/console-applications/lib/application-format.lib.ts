import type { ApplicationAnswer } from "@/entities/application";
import type { Question, QuestionType } from "@/entities/questionnaire";

/** A privacy-safe applicant handle (no PII is exposed by the API). */
export const maskApplicant = (applicantId: string): string => `신청자 ${applicantId.slice(-6)}`;

/** Render submitted values for display, per question type. */
export const formatAnswerValues = (type: QuestionType, values: string[]): string => {
  if (values.length === 0) return "—";
  if (type === "BOOLEAN") return values[0] === "true" ? "예" : "아니오";

  return values.join(", ");
};

export interface AnswerRow {
  questionId: string;
  prompt: string;
  text: string;
}

/** Join submitted answers to their prompts from the (versioned) questionnaire. */
export const answerRows = (
  answers: readonly ApplicationAnswer[],
  questions: readonly Question[],
): AnswerRow[] => {
  const byId = new Map(questions.map((question) => [question.id, question]));

  return answers.map((answer) => {
    const question = byId.get(answer.questionId);

    return {
      questionId: answer.questionId,
      prompt: question?.prompt ?? "삭제된 질문",
      text: formatAnswerValues(question?.type ?? "TEXT", answer.values),
    };
  });
};
