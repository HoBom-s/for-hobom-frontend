import * as stylex from "@stylexjs/stylex";
import { REVIEW_STEP, useApplyAdoption } from "../model/useApplyAdoption";
import { ApplyHeader } from "./ApplyHeader";
import { ApplyNav } from "./ApplyNav";
import { QuestionField } from "./QuestionField";
import { ReviewStep } from "./ReviewStep";
import { styles } from "./ApplyAdoption.styles";

/** §03 adoption funnel: one question per step (URL-synced) ending in a review,
 *  with a bottom action bar on mobile / inline nav on desktop. */
export const ApplyAdoption = ({ animalId }: { animalId: string }) => {
  const {
    animal,
    Funnel,
    questions,
    answers,
    setAnswer,
    currentIndex,
    totalSteps,
    isReview,
    canPrev,
    onNext,
    onPrev,
    isSubmitting,
  } = useApplyAdoption(animalId);

  return (
    <div {...stylex.props(styles.root)}>
      <ApplyHeader
        animalId={animalId}
        animalName={animal.name}
        currentIndex={currentIndex}
        totalSteps={totalSteps}
      />

      <div {...stylex.props(styles.funnelArea)}>
        <Funnel>
          {[
            ...questions.map((question) => (
              <Funnel.Step key={question.id} name={question.id}>
                <QuestionField
                  question={question}
                  values={answers[question.id] ?? []}
                  onChange={(values) => setAnswer(question.id, values)}
                />
              </Funnel.Step>
            )),
            <Funnel.Step key={REVIEW_STEP} name={REVIEW_STEP}>
              <ReviewStep questions={questions} answers={answers} />
            </Funnel.Step>,
          ]}
        </Funnel>
      </div>

      <ApplyNav
        canPrev={canPrev}
        isReview={isReview}
        isSubmitting={isSubmitting}
        onPrev={onPrev}
        onNext={onNext}
      />
    </div>
  );
};
