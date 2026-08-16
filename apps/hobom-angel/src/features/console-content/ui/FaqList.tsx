import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import type { ShelterFaq } from "@/entities/shelter";
import { styles } from "./ConsoleContent.styles";

interface FaqListProps {
  faqs: ShelterFaq[];
  editingId: string | null;
  onEdit: (faq: ShelterFaq) => void;
  onDelete: (id: string) => void;
}

/** The shelter's FAQ entries, each with edit / delete. */
export const FaqList = ({ faqs, editingId, onEdit, onDelete }: FaqListProps) => {
  if (faqs.length === 0) {
    return (
      <div {...stylex.props(styles.empty)}>
        <span {...stylex.props(styles.emptyKicker)}>FAQ</span>
        <p {...stylex.props(styles.emptyText)}>아직 등록한 FAQ가 없어요.</p>
      </div>
    );
  }

  return (
    <div {...stylex.props(styles.list)}>
      {faqs.map((faq) => (
        <article
          key={faq.id}
          {...stylex.props(styles.row, faq.id === editingId && styles.rowActive)}
        >
          <div {...stylex.props(styles.rowHead)}>
            <span {...stylex.props(styles.rowTitle)}>Q. {faq.question}</span>
            <span {...stylex.props(styles.spacer)} />
            <div {...stylex.props(styles.rowActions)}>
              <Hb.Button variant="ghost" size="small" onClick={() => onEdit(faq)}>
                수정
              </Hb.Button>
              <Hb.Button variant="danger" size="small" onClick={() => onDelete(faq.id)}>
                삭제
              </Hb.Button>
            </div>
          </div>
          <p {...stylex.props(styles.preview)}>{faq.answer}</p>
        </article>
      ))}
    </div>
  );
};
