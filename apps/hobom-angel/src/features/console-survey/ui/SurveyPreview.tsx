import * as stylex from "@stylexjs/stylex";
import { QuestionField } from "@/entities/questionnaire";
import type { Question } from "@/entities/questionnaire";
import { styles } from "./ConsoleSurvey.styles";

const NO_VALUES: string[] = [];
const noop = () => {};

/** The right-hand live preview — the survey rendered with the real applicant
 *  funnel fields, locked so staff can look but not answer. */
export const SurveyPreview = ({ questions }: { questions: Question[] }) => {
  if (questions.length === 0) {
    return (
      <div {...stylex.props(styles.preview)}>
        <p {...stylex.props(styles.previewEmpty)}>
          질문을 추가하면 신청자 화면 미리보기가 여기 표시돼요.
        </p>
      </div>
    );
  }

  return (
    <div {...stylex.props(styles.preview, styles.previewLock)} aria-hidden>
      {questions.map((question) => (
        <QuestionField
          key={question.id}
          question={{ ...question, prompt: question.prompt.trim() || "제목 없는 질문" }}
          values={NO_VALUES}
          onChange={noop}
        />
      ))}
    </div>
  );
};
