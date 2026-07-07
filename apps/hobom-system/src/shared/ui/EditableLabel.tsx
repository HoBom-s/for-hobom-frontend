import { useState, type CSSProperties, type KeyboardEvent } from "react";
import { Hb } from "hobom-design-system";

interface EditableLabelProps {
  value: string;
  onCommit: (value: string) => void;
  textSx?: CSSProperties;
  inputSx?: CSSProperties;
}

/** 더블클릭으로 인라인 편집되는 라벨. Enter/blur 저장, Esc 취소. */
export function EditableLabel({ value, onCommit, textSx, inputSx }: EditableLabelProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  const start = () => {
    setDraft(value);
    setEditing(true);
  };

  const commit = () => {
    setEditing(false);
    const next = draft.trim();

    if (next && next !== value) {
      onCommit(next);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      commit();
    } else if (event.key === "Escape") {
      setEditing(false);
    }
  };

  if (editing) {
    return (
      <Hb.InputBase
        autoFocus
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onBlur={commit}
        onKeyDown={handleKeyDown}
        onClick={(event) => event.stopPropagation()}
        style={{
          font: "inherit",
          color: "inherit",
          paddingInline: 4,
          borderRadius: 4,
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: "var(--hb-color-accent)",
          minWidth: 0,
          ...inputSx,
        }}
      />
    );
  }

  return (
    <Hb.Text onDoubleClick={start} style={{ cursor: "default", ...textSx }}>
      {value}
    </Hb.Text>
  );
}
