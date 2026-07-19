import * as stylex from "@stylexjs/stylex";
import { useConsoleFaqs } from "../model/useConsoleFaqs";
import { FaqForm } from "./FaqForm";
import { FaqList } from "./FaqList";
import { styles } from "./ConsoleContent.styles";

/** FAQ management — the form on the left, the list on the right (1:1). */
export const FaqManager = ({ shelterId }: { shelterId: string }) => {
  const { faqs, editing, edit, clearEdit, createFaq, updateFaq, removeFaq, saving } =
    useConsoleFaqs(shelterId);

  return (
    <div {...stylex.props(styles.layout)}>
      <div {...stylex.props(styles.col)}>
        <FaqForm
          key={editing?.id ?? "new"}
          editing={editing}
          onCreate={createFaq}
          onUpdate={updateFaq}
          onCancel={clearEdit}
          saving={saving}
        />
      </div>
      <div {...stylex.props(styles.col)}>
        <FaqList faqs={faqs} editingId={editing?.id ?? null} onEdit={edit} onDelete={removeFaq} />
      </div>
    </div>
  );
};
