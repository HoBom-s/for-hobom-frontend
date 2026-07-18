import * as stylex from "@stylexjs/stylex";
import type { Question } from "@/entities/questionnaire";
import { BooleanAnswer } from "./fields/BooleanAnswer";
import { MultiChoiceAnswer } from "./fields/MultiChoiceAnswer";
import { SingleChoiceAnswer } from "./fields/SingleChoiceAnswer";
import { TextAnswer } from "./fields/TextAnswer";
import { styles } from "./ApplyPlacement.styles";

interface QuestionFieldProps {
  question: Question;
  values: string[];
  onChange: (values: string[]) => void;
}

const renderAnswer = (question: Question, id: string, props: Omit<QuestionFieldProps, "question">) => {
  switch (question.type) {
    case "TEXT":
      return <TextAnswer id={id} {...props} />;
    case "BOOLEAN":
      return <BooleanAnswer id={id} {...props} />;
    case "SINGLE_CHOICE":
      return <SingleChoiceAnswer id={id} options={question.options} {...props} />;
    case "MULTI_CHOICE":
      return <MultiChoiceAnswer id={id} options={question.options} {...props} />;
  }
};

/** One survey question: the prompt plus the field for its type (§03). */
export const QuestionField = ({ question, values, onChange }: QuestionFieldProps) => {
  const id = `q-${question.id}`;

  return (
    <div {...stylex.props(styles.field)}>
      <label {...stylex.props(styles.prompt)} id={id}>
        {question.prompt}
        {question.required && <span {...stylex.props(styles.required)}> *</span>}
      </label>

      {renderAnswer(question, id, { values, onChange })}
    </div>
  );
};
