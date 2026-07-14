import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMutation, useSuspenseQuery } from "hobom-data";
import { animalQueries } from "@/entities/animal";
import { adoptionMutations } from "@/entities/adoption";
import { questionnaireQueries } from "@/entities/questionnaire";
import { animalDetailPath } from "@/shared/config";
import { useFunnel, useToast } from "@/shared/model";
import { isStepBlocked, toAnswerList, type AnswerMap } from "../lib/apply-steps.lib";

const STEP_QUERY_KEY = "step";

export const REVIEW_STEP = "review";

/**
 * Drives the adoption funnel: loads the animal and its shelter's survey, then
 * walks one question per step (URL-synced via `useFunnel`, so back/forward and
 * refresh keep the step), ending on a review step that submits the application.
 */
export const useApplyAdoption = (animalId: string) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { openSuccessToast, openErrorToast, openWarnToast } = useToast();

  const { data: animal } = useSuspenseQuery(animalQueries.detail(animalId));
  const { data: questionnaire } = useSuspenseQuery(
    questionnaireQueries.forShelter(animal.shelterId, "ADOPTION"),
  );

  const questions = questionnaire?.questions ?? [];
  const stepNames: string[] = [...questions.map((question) => question.id), REVIEW_STEP];
  const stepAt = (index: number): string => stepNames[index] ?? REVIEW_STEP;

  const [Funnel, setStep] = useFunnel(stepNames as [string, ...string[]], {
    stepQueryKey: STEP_QUERY_KEY,
    initialStep: stepAt(0),
  });

  const [answers, setAnswers] = useState<AnswerMap>({});

  const currentStep = searchParams.get(STEP_QUERY_KEY) ?? stepAt(0);
  const currentIndex = Math.max(0, stepNames.indexOf(currentStep));

  const { mutate, isPending } = useMutation({
    ...adoptionMutations.submit(animalId),
    onSuccess: () => {
      openSuccessToast({ message: "신청이 접수됐어요. 승인 결과를 기다려주세요." });
      void navigate(animalDetailPath(animalId), { replace: true });
    },
    onError: (error) =>
      openErrorToast({ message: error instanceof Error ? error.message : "신청에 실패했어요." }),
  });

  const setAnswer = (questionId: string, values: string[]) =>
    setAnswers((prev) => ({ ...prev, [questionId]: values }));

  const currentQuestion = questions[currentIndex];
  const isReview = currentIndex >= questions.length;

  const submit = () => mutate({ answers: toAnswerList(questions, answers) });

  const onNext = () => {
    if (isReview) {
      submit();

      return;
    }

    if (currentQuestion && isStepBlocked(currentQuestion, answers)) {
      openWarnToast({ message: "필수 항목이에요." });

      return;
    }

    setStep(stepAt(currentIndex + 1));
  };

  const onPrev = () => setStep(stepAt(Math.max(0, currentIndex - 1)));

  return {
    animal,
    Funnel,
    questions,
    answers,
    setAnswer,
    currentIndex,
    totalSteps: stepNames.length,
    isReview,
    canPrev: currentIndex > 0,
    onNext,
    onPrev,
    isSubmitting: isPending,
  };
};
