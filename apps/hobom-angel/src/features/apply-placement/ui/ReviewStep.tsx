import * as stylex from "@stylexjs/stylex";
import type { Question } from "@/entities/questionnaire";
import { isAnswered } from "../lib/apply-steps.lib";
import { styles } from "./ApplyPlacement.styles";
import type { AnswerMap } from "../lib/apply-steps.lib";

const BOOLEAN_LABELS: Record<string, string> = { true: "예", false: "아니오" };
const readable = (value: string) => BOOLEAN_LABELS[value] ?? value;

interface ReviewStepProps {
  questions: Question[];
  answers: AnswerMap;
}

/** Final funnel step — a summary of the answered questions before submitting. */
export const ReviewStep = ({ questions, answers }: ReviewStepProps) => {
  const reviewed = questions.filter((question) => isAnswered(question, answers[question.id]));

  return (
    <div {...stylex.props(styles.step)}>
      <div {...stylex.props(styles.reviewHeader)}>
        <span {...stylex.props(styles.kicker)}>
          <span {...stylex.props(styles.kickerDot)} aria-hidden="true" />
          확인
        </span>
        <div {...stylex.props(styles.titleRow)}>
          <span {...stylex.props(styles.rule)} aria-hidden="true" />
          <h2 {...stylex.props(styles.reviewTitle)}>입력한 내용을 확인해주세요</h2>
        </div>
      </div>

      {reviewed.length === 0 ? (
        <p {...stylex.props(styles.emptyNote)}>추가 질문 없이 바로 신청할 수 있어요.</p>
      ) : (
        <div {...stylex.props(styles.reviewList)}>
          {reviewed.map((question) => (
            <div key={question.id} {...stylex.props(styles.reviewItem)}>
              <span {...stylex.props(styles.reviewPrompt)}>{question.prompt}</span>
              <span {...stylex.props(styles.reviewAnswer)}>
                {(answers[question.id] ?? []).map(readable).join(", ")}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
