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
