import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { styles } from "../ApplyPlacement.styles";

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

    return onChange(values.includes(value) ? values.filter((v) => v !== value) : [...values, value]);
  };

  return (
    <div {...stylex.props(styles.options)} role="group" aria-labelledby={id}>
      {options.map((option) => (
        <Hb.ToggleButton
          key={option.value}
          value={option.value}
          selected={values.includes(option.value)}
          onChange={() => select(option.value)}
        >
          {option.label}
        </Hb.ToggleButton>
      ))}
    </div>
  );
};
