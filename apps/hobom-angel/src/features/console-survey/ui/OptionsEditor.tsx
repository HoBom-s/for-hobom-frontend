import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { styles } from "./ConsoleSurvey.styles";

interface OptionsEditorProps {
  options: string[];
  onChange: (options: string[]) => void;
}

/** Edit the choice options for a SINGLE/MULTI question — at least one row stays. */
export const OptionsEditor = ({ options, onChange }: OptionsEditorProps) => {
  const rows = options.length > 0 ? options : [""];

  const update = (index: number, value: string) =>
    onChange(rows.map((option, i) => (i === index ? value : option)));
  const remove = (index: number) => onChange(rows.filter((_, i) => i !== index));

  return (
    <div {...stylex.props(styles.options)}>
      {rows.map((option, index) => (
        <div key={index} {...stylex.props(styles.optionRow)}>
          <div {...stylex.props(styles.optionInput)}>
            <Hb.TextField
              size="small"
              value={option}
              placeholder={`선택지 ${index + 1}`}
              onChange={(event) => update(index, event.target.value)}
            />
          </div>
          <Hb.Button
            variant="ghost"
            size="small"
            onClick={() => remove(index)}
            disabled={rows.length <= 1}
            aria-label="선택지 삭제"
          >
            삭제
          </Hb.Button>
        </div>
      ))}
      <Hb.Button variant="ghost" size="small" onClick={() => onChange([...rows, ""])}>
        + 선택지 추가
      </Hb.Button>
    </div>
  );
};
