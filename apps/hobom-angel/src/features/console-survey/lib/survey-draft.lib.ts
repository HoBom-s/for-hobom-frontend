import type {
  DefineQuestionnaireInput,
  Question,
  Questionnaire,
  QuestionType,
} from "@/entities/questionnaire";
import { isChoiceType } from "@/entities/questionnaire";

/** A fresh, empty question (defaults to free text). */
export const blankQuestion = (id: string): Question => ({
  id,
  prompt: "",
  type: "TEXT",
  options: [],
  required: false,
});

/** Seed the editor from the loaded survey (or empty when none is defined). */
export const draftFromQuestionnaire = (questionnaire: Questionnaire | null): Question[] =>
  questionnaire ? questionnaire.questions.map((q) => ({ ...q, options: [...q.options] })) : [];

/** Reorder so `activeId` lands where `overId` sits (drag-and-drop). Unknown ids
 *  or a no-move drop leave the list unchanged. */
export const reorderQuestions = (
  questions: readonly Question[],
  activeId: string,
  overId: string,
): Question[] => {
  const from = questions.findIndex((q) => q.id === activeId);
  const to = questions.findIndex((q) => q.id === overId);

  if (from < 0 || to < 0 || from === to) return [...questions];

  const next = [...questions];
  const moved = next[from];

  if (!moved) return next;

  next.splice(from, 1);
  next.splice(to, 0, moved);

  return next;
};

export interface DraftError {
  id: string;
  message: string;
}

/** Validation mirrors the backend: a prompt is required, and choice questions
 *  need at least one non-empty option. */
export const validateDraft = (questions: readonly Question[]): DraftError[] => {
  const errors: DraftError[] = [];

  questions.forEach((question) => {
    if (!question.prompt.trim()) {
      errors.push({ id: question.id, message: "질문 내용을 입력해 주세요." });

      return;
    }

    if (isChoiceType(question.type) && question.options.every((option) => !option.trim())) {
      errors.push({ id: question.id, message: "선택지를 하나 이상 추가해 주세요." });
    }
  });

  return errors;
};

/** Trim and drop the options a non-choice type shouldn't carry. */
export const toDefineInput = (questions: readonly Question[]): DefineQuestionnaireInput => ({
  questions: questions.map((question) => ({
    id: question.id,
    prompt: question.prompt.trim(),
    type: question.type,
    options: isChoiceType(question.type)
      ? question.options.map((option) => option.trim()).filter(Boolean)
      : [],
    required: question.required,
  })),
});

/** Switching a type in or out of "choice" seeds/clears its options so the row
 *  never sits in an invalid in-between state. */
export const optionsForType = (type: QuestionType, current: string[]): string[] => {
  if (!isChoiceType(type)) return [];

  return current.length > 0 ? current : [""];
};

/** The mono meta line under a field row, e.g. `SINGLE_CHOICE · 필수`. */
export const questionMeta = (question: Question): string =>
  `${question.type} · ${question.required ? "필수" : "선택"}`;

/** The save-status caption for the builder's top bar. */
export const saveStatusCaption = (published: boolean, dirty: boolean): string => {
  if (!published) return "아직 저장하지 않은 새 설문";
  if (dirty) return "저장하지 않은 변경 사항";

  return "신청서에 반영된 버전이에요";
};
