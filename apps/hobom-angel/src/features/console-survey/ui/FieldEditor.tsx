import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { QUESTION_TYPE_LABEL, isChoiceType } from "@/entities/questionnaire";
import type { Question, QuestionType } from "@/entities/questionnaire";
import { OptionsEditor } from "./OptionsEditor";
import { styles } from "./ConsoleSurvey.styles";

const TYPE_ORDER: QuestionType[] = ["TEXT", "BOOLEAN", "SINGLE_CHOICE", "MULTI_CHOICE"];

interface FieldEditorProps {
  question: Question | null;
  error?: string;
  onPrompt: (value: string) => void;
  onType: (type: QuestionType) => void;
  onRequired: (required: boolean) => void;
  onOptions: (options: string[]) => void;
}

/** Settings for the selected field: prompt, type, required, and choice options. */
export const FieldEditor = ({
  question,
  error,
  onPrompt,
  onType,
  onRequired,
  onOptions,
}: FieldEditorProps) => {
  if (!question) {
    return <p {...stylex.props(styles.editorHint)}>필드를 선택하면 여기서 설정할 수 있어요.</p>;
  }

  return (
    <div {...stylex.props(styles.editor)}>
      <h3 {...stylex.props(styles.editorTitle)}>필드 설정</h3>

      <span {...stylex.props(styles.label)}>질문</span>
      <Hb.TextField
        value={question.prompt}
        placeholder="질문 내용을 입력하세요"
        onChange={(event) => onPrompt(event.target.value)}
      />

      <span {...stylex.props(styles.label)}>타입</span>
      <Hb.ToggleButtonGroup variant="segmented">
        {TYPE_ORDER.map((type) => (
          <Hb.ToggleButton
            key={type}
            value={type}
            selected={question.type === type}
            size="small"
            variant="segmented"
            onChange={(_, value) => onType(value as QuestionType)}
          >
            {QUESTION_TYPE_LABEL[type]}
          </Hb.ToggleButton>
        ))}
      </Hb.ToggleButtonGroup>

      {isChoiceType(question.type) && (
        <>
          <span {...stylex.props(styles.label)}>선택지</span>
          <OptionsEditor options={question.options} onChange={onOptions} />
        </>
      )}

      <label {...stylex.props(styles.check)}>
        <Hb.Checkbox
          checked={question.required}
          onChange={(event) => onRequired(event.target.checked)}
        />
        필수 응답
      </label>

      {error && <span {...stylex.props(styles.error)}>{error}</span>}
    </div>
  );
};
