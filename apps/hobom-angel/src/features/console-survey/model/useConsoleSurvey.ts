import { useState } from "react";
import { useDataLot, useMutation, useSuspenseQuery } from "hobom-data";
import { questionnaireMutations, questionnaireQueries } from "@/entities/questionnaire";
import { useToast } from "@/shared/model";
import type { Question, QuestionType, QuestionnairePurpose } from "@/entities/questionnaire";
import {
  blankQuestion,
  draftFromQuestionnaire,
  optionsForType,
  reorderQuestions,
  toDefineInput,
  validateDraft,
} from "../lib/survey-draft.lib";

const newId = () => crypto.randomUUID();

const seededQuestion = (type: QuestionType): Question => {
  const base = blankQuestion(newId());

  return { ...base, type, options: optionsForType(type, []) };
};

/** The §7.5 survey builder for one purpose: a local, editable draft seeded from
 *  the saved survey, plus the save mutation. Mount one per purpose (`key`) so
 *  switching purpose re-seeds the draft. */
export const useConsoleSurvey = (shelterId: string, purpose: QuestionnairePurpose) => {
  const dataLot = useDataLot();
  const { openSuccessToast, openErrorToast } = useToast();

  const options = questionnaireQueries.forShelter(shelterId, purpose);
  const { data: questionnaire } = useSuspenseQuery(options);
  const [questions, setQuestions] = useState<Question[]>(() =>
    draftFromQuestionnaire(questionnaire),
  );
  const [selectedId, setSelectedId] = useState<string | null>(() => questions[0]?.id ?? null);

  const save = useMutation({
    ...questionnaireMutations.define(),
    onSuccess: () => {
      openSuccessToast({ message: "설문을 저장했어요." });
      void dataLot.invalidateQueries(options);
    },
    onError: (error: Error) =>
      openErrorToast({ message: error.message || "설문 저장에 실패했어요." }),
  });

  const patchQuestion = (id: string, patch: Partial<Question>) =>
    setQuestions((prev) => prev.map((q) => (q.id === id ? { ...q, ...patch } : q)));

  const errors = validateDraft(questions);
  const dirty = JSON.stringify(questions) !== JSON.stringify(draftFromQuestionnaire(questionnaire));

  const addQuestion = (type: QuestionType) => {
    const question = seededQuestion(type);

    setQuestions((prev) => [...prev, question]);
    setSelectedId(question.id);
  };

  const removeQuestion = (id: string) =>
    setQuestions((prev) => {
      const next = prev.filter((q) => q.id !== id);

      setSelectedId((current) => (current === id ? (next[0]?.id ?? null) : current));

      return next;
    });

  return {
    version: questionnaire?.version ?? null,
    dirty,
    questions,
    errors,
    selectedId,
    selected: questions.find((q) => q.id === selectedId) ?? null,
    select: setSelectedId,
    addQuestion,
    removeQuestion,
    reorder: (activeId: string, overId: string) =>
      setQuestions((prev) => reorderQuestions(prev, activeId, overId)),
    setPrompt: (id: string, prompt: string) => patchQuestion(id, { prompt }),
    setRequired: (id: string, required: boolean) => patchQuestion(id, { required }),
    setType: (id: string, type: QuestionType) =>
      setQuestions((prev) =>
        prev.map((q) => (q.id === id ? { ...q, type, options: optionsForType(type, q.options) } : q)),
      ),
    setOptions: (id: string, opts: string[]) => patchQuestion(id, { options: opts }),
    save: () => {
      if (errors.length > 0) return;

      save.mutate({ shelterId, purpose, input: toDefineInput(questions) });
    },
    saving: save.isPending,
    canSave: questions.length > 0 && errors.length === 0 && dirty,
  };
};
