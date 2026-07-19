import { useState } from "react";
import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import type { AnnouncementInput, ShelterAnnouncement } from "@/entities/shelter";
import { styles } from "./ConsoleContent.styles";

interface AnnouncementFormProps {
  editing: ShelterAnnouncement | null;
  onCreate: (input: AnnouncementInput) => void;
  onUpdate: (input: AnnouncementInput) => void;
  onCancel: () => void;
  saving: boolean;
}

/** Create or edit a shelter announcement (제목 · 내용 · 상단 고정). */
export const AnnouncementForm = ({
  editing,
  onCreate,
  onUpdate,
  onCancel,
  saving,
}: AnnouncementFormProps) => {
  const [title, setTitle] = useState(editing?.title ?? "");
  const [body, setBody] = useState(editing?.body ?? "");
  const [pinned, setPinned] = useState(editing?.pinned ?? false);

  const canSubmit = title.trim().length > 0 && body.trim().length > 0 && !saving;

  const submit = () => {
    if (!canSubmit) return;

    const input = { title: title.trim(), body: body.trim(), pinned };

    if (editing) {
      onUpdate(input);

      return;
    }

    onCreate(input);
    setTitle("");
    setBody("");
    setPinned(false);
  };

  return (
    <section {...stylex.props(styles.card)}>
      <h3 {...stylex.props(styles.heading)}>{editing ? "공지 수정" : "새 공지"}</h3>

      <input
        {...stylex.props(styles.input)}
        value={title}
        placeholder="공지 제목"
        onChange={(event) => setTitle(event.target.value)}
      />
      <textarea
        {...stylex.props(styles.input, styles.textarea)}
        value={body}
        placeholder="내용을 입력하세요."
        onChange={(event) => setBody(event.target.value)}
      />
      <label {...stylex.props(styles.check)}>
        <input
          type="checkbox"
          checked={pinned}
          onChange={(event) => setPinned(event.target.checked)}
        />
        상단 고정
      </label>

      <div {...stylex.props(styles.actions)}>
        {editing && (
          <Hb.Button variant="ghost" onClick={onCancel}>
            취소
          </Hb.Button>
        )}
        <Hb.Button variant="primary" onClick={submit} disabled={!canSubmit} loading={saving}>
          {editing ? "저장" : "게시"}
        </Hb.Button>
      </div>
    </section>
  );
};
