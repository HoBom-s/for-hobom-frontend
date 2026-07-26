import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { styles } from "../QuestionField.styles";

interface TextAnswerProps {
  id: string;
  values: string[];
  onChange: (values: string[]) => void;
}

/** Free-text answer with a character counter. */
export const TextAnswer = ({ id, values, onChange }: TextAnswerProps) => {
  const value = values[0] ?? "";

  return (
    <>
      <Hb.TextField
        fullWidth
        multiline
        minRows={4}
        placeholder="자유롭게 작성해주세요"
        aria-labelledby={id}
        value={value}
        onChange={(event) => onChange([event.target.value])}
      />
      <span {...stylex.props(styles.counter)}>{value.length}자</span>
    </>
  );
};
