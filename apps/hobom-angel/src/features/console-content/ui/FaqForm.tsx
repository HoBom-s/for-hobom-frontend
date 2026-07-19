import { useState } from "react";
import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import type { ShelterFaq } from "@/entities/shelter";
import { styles } from "./ConsoleContent.styles";
import type { FaqDraft } from "../model/useConsoleFaqs";

interface FaqFormProps {
  editing: ShelterFaq | null;
  onCreate: (draft: FaqDraft) => void;
  onUpdate: (draft: FaqDraft) => void;
  onCancel: () => void;
  saving: boolean;
}

/** Create or edit a shelter FAQ (질문 · 답변). */
export const FaqForm = ({ editing, onCreate, onUpdate, onCancel, saving }: FaqFormProps) => {
  const [question, setQuestion] = useState(editing?.question ?? "");
  const [answer, setAnswer] = useState(editing?.answer ?? "");

  const canSubmit = question.trim().length > 0 && answer.trim().length > 0 && !saving;

  const submit = () => {
    if (!canSubmit) return;

    const draft = { question: question.trim(), answer: answer.trim() };

    if (editing) {
      onUpdate(draft);

      return;
    }

    onCreate(draft);
    setQuestion("");
    setAnswer("");
  };

  return (
    <section {...stylex.props(styles.card)}>
      <h3 {...stylex.props(styles.heading)}>{editing ? "FAQ 수정" : "새 FAQ"}</h3>

      <input
        {...stylex.props(styles.input)}
        value={question}
        placeholder="질문"
        onChange={(event) => setQuestion(event.target.value)}
      />
      <textarea
        {...stylex.props(styles.input, styles.textarea)}
        value={answer}
        placeholder="답변"
        onChange={(event) => setAnswer(event.target.value)}
      />

      <div {...stylex.props(styles.actions)}>
        {editing && (
          <Hb.Button variant="ghost" onClick={onCancel}>
            취소
          </Hb.Button>
        )}
        <Hb.Button variant="primary" onClick={submit} disabled={!canSubmit} loading={saving}>
          {editing ? "저장" : "추가"}
        </Hb.Button>
      </div>
    </section>
  );
};
