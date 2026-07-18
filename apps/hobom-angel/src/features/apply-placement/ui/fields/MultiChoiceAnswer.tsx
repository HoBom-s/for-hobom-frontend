import { PillGroup } from "./PillGroup";

interface MultiChoiceAnswerProps {
  id: string;
  options: string[];
  values: string[];
  onChange: (values: string[]) => void;
}

/** Pick any number of the shelter-defined options. */
export const MultiChoiceAnswer = ({ id, options, values, onChange }: MultiChoiceAnswerProps) => (
  <PillGroup
    id={id}
    options={options.map((option) => ({ label: option, value: option }))}
    values={values}
    multiple
    onChange={onChange}
  />
);
