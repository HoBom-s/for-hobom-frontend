import { PillGroup } from "./PillGroup";

const OPTIONS = [
  { label: "예", value: "true" },
  { label: "아니오", value: "false" },
];

interface BooleanAnswerProps {
  id: string;
  values: string[];
  onChange: (values: string[]) => void;
}

/** Yes/no answer (stored as "true"/"false"). */
export const BooleanAnswer = ({ id, values, onChange }: BooleanAnswerProps) => (
  <PillGroup id={id} options={OPTIONS} values={values} multiple={false} onChange={onChange} />
);
