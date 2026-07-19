export type QuestionType = "TEXT" | "BOOLEAN" | "SINGLE_CHOICE" | "MULTI_CHOICE";
export type QuestionnairePurpose = "ADOPTION" | "FOSTER";

/** One survey question. Choice types carry `options`. */
export interface Question {
  id: string;
  prompt: string;
  type: QuestionType;
  options: string[];
  required: boolean;
}

/** A shelter's survey for a given purpose (a flat, versioned question list). */
export interface Questionnaire {
  id: string;
  shelterId: string;
  purpose: QuestionnairePurpose;
  version: number;
  questions: Question[];
}

/** One answer — values are always a string array (a boolean as `["true"]`,
 *  a single choice as `["option"]`, text as `["…"]`). */
export interface Answer {
  questionId: string;
  values: string[];
}

/** `PUT` body for defining/replacing a shelter's survey (staff). */
export interface DefineQuestionnaireInput {
  questions: Question[];
}

export const PURPOSE_LABEL: Record<QuestionnairePurpose, string> = {
  ADOPTION: "입양 설문",
  FOSTER: "임시보호 설문",
};

export const QUESTION_TYPE_LABEL: Record<QuestionType, string> = {
  TEXT: "단답",
  BOOLEAN: "예 / 아니오",
  SINGLE_CHOICE: "단일 선택",
  MULTI_CHOICE: "다중 선택",
};

/** Choice types carry `options` and require at least one to be valid. */
export const isChoiceType = (type: QuestionType): boolean =>
  type === "SINGLE_CHOICE" || type === "MULTI_CHOICE";
