import * as stylex from "@stylexjs/stylex";
import type { Question } from "@/entities/questionnaire";
import { isAnswered } from "../lib/apply-steps.lib";
import { styles } from "./ApplyAdoption.styles";
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
      <h2 {...stylex.props(styles.reviewTitle)}>입력한 내용을 확인해주세요</h2>

      {reviewed.length === 0 ? (
        <p {...stylex.props(styles.emptyNote)}>추가 질문 없이 바로 신청할 수 있어요.</p>
      ) : (
        reviewed.map((question) => (
          <div key={question.id} {...stylex.props(styles.reviewItem)}>
            <span {...stylex.props(styles.reviewPrompt)}>{question.prompt}</span>
            <span {...stylex.props(styles.reviewAnswer)}>
              {(answers[question.id] ?? []).map(readable).join(", ")}
            </span>
          </div>
        ))
      )}
    </div>
  );
};
