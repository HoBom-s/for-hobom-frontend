import { PillGroup } from "./PillGroup";

interface SingleChoiceAnswerProps {
  id: string;
  options: string[];
  values: string[];
  onChange: (values: string[]) => void;
}

/** Pick exactly one of the shelter-defined options. */
export const SingleChoiceAnswer = ({ id, options, values, onChange }: SingleChoiceAnswerProps) => (
  <PillGroup
    id={id}
    options={options.map((option) => ({ label: option, value: option }))}
    values={values}
    multiple={false}
    onChange={onChange}
  />
);
