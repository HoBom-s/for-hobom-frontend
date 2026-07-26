import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { QUESTION_TYPE_LABEL } from "@/entities/questionnaire";
import type { QuestionType } from "@/entities/questionnaire";
import { styles } from "./ConsoleSurvey.styles";

// Only the field types the backend can persist. The design's date/file/rating
// chips are omitted until the API supports them.
const PALETTE: QuestionType[] = ["TEXT", "SINGLE_CHOICE", "MULTI_CHOICE", "BOOLEAN"];

interface FieldPaletteProps {
  onAdd: (type: QuestionType) => void;
}

/** The "+ 필드 추가" palette — one chip per supported question type. */
export const FieldPalette = ({ onAdd }: FieldPaletteProps) => (
  <div {...stylex.props(styles.palette)}>
    <span {...stylex.props(styles.paletteLabel)}>+ 필드 추가</span>
    {PALETTE.map((type) => (
      <Hb.Button
        key={type}
        variant="secondary"
        size="small"
        shape="pill"
        aria-label={`${QUESTION_TYPE_LABEL[type]} 필드 추가`}
        onClick={() => onAdd(type)}
      >
        {QUESTION_TYPE_LABEL[type]}
      </Hb.Button>
    ))}
  </div>
);
