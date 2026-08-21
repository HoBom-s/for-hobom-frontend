import * as stylex from "@stylexjs/stylex";
import { QuestionField, type QuestionnairePurpose } from "@/entities/questionnaire";
import { REVIEW_STEP, useApplyPlacement } from "../model/useApplyPlacement";
import { ApplyHeader } from "./ApplyHeader";
import { ApplyNav } from "./ApplyNav";
import { ReviewStep } from "./ReviewStep";
import { styles } from "./ApplyPlacement.styles";

interface ApplyPlacementProps {
  animalId: string;
  /** ADOPTION drives the adoption funnel; FOSTER the 임시보호 funnel. */
  purpose: QuestionnairePurpose;
}

/** §03 placement funnel: one question per step (URL-synced) ending in a review,
 *  with a bottom action bar on mobile / inline nav on desktop. Shared by the
 *  adoption and foster applications (they differ only in survey + endpoint). */
export const ApplyPlacement = ({ animalId, purpose }: ApplyPlacementProps) => {
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
  } = useApplyPlacement(animalId, purpose);

  return (
    <div {...stylex.props(styles.root)}>
      <ApplyHeader
        animalId={animalId}
        animalName={animal.name}
        shelterName={animal.shelter?.name}
        currentIndex={currentIndex}
        totalSteps={totalSteps}
      />

      <div {...stylex.props(styles.funnelArea)}>
        <div {...stylex.props(styles.funnelCard)}>
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
