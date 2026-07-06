import { useState, type CSSProperties, type KeyboardEvent } from "react";
import { Hb, type SxProps, type Theme } from "hobom-design-system";

interface EditableLabelProps {
  value: string;
  onCommit: (value: string) => void;
  textSx?: CSSProperties;
  inputSx?: SxProps<Theme>;
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
        sx={{
          font: "inherit",
          color: "inherit",
          px: 0.5,
          borderRadius: 0.5,
          border: 1,
          borderColor: "primary.main",
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
