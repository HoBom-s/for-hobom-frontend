import * as stylex from "@stylexjs/stylex";
import { styles } from "../QuestionField.styles";

export interface Option {
  label: string;
  value: string;
}

interface PillGroupProps {
  id: string;
  options: Option[];
  values: string[];
  multiple: boolean;
  onChange: (values: string[]) => void;
}

/** Selectable option pills, single- or multi-select. */
export const PillGroup = ({ id, options, values, multiple, onChange }: PillGroupProps) => {
  const select = (value: string) => {
    if (!multiple) return onChange([value]);

    return onChange(
      values.includes(value) ? values.filter((v) => v !== value) : [...values, value],
    );
  };

  return (
    <div {...stylex.props(styles.options)} role="group" aria-labelledby={id}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={values.includes(option.value)}
          {...stylex.props(styles.option, values.includes(option.value) && styles.optionSelected)}
          onClick={() => select(option.value)}
        >
          <span
            {...stylex.props(styles.optionDot, values.includes(option.value) && styles.optionDotOn)}
            aria-hidden="true"
          />
          {option.label}
        </button>
      ))}
    </div>
  );
};
