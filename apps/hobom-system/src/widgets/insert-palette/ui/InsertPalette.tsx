import * as stylex from "@stylexjs/stylex";
import { Hb } from "@/shared/ui";
import { listManifests, type ComponentKey } from "@/entities/manifest";

const styles = stylex.create({
  chip: {
    border: "1px solid",
    borderColor: "var(--hb-color-border)",
    borderRadius: 8,
    backgroundColor: "transparent",
    color: "var(--hb-color-text-primary)",
    fontFamily: "inherit",
    fontSize: 12,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 4,
    paddingBottom: 4,
    cursor: "pointer",
    transition: "background-color 0.12s",
    ":hover": { backgroundColor: "var(--hb-color-border)" },
  },
});

interface InsertPaletteProps {
  onInsert: (key: ComponentKey) => void;
}

/** 등록된 컴포넌트를 칩 목록으로 보여준다. 클릭하면 선택된 컨테이너(또는 루트)에 추가. */
export function InsertPalette({ onInsert }: InsertPaletteProps) {
  return (
    <Hb.Box
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 4,
        padding: 12,
      }}
    >
      {listManifests().map((manifest) => (
        <Hb.Box
          key={manifest.name}
          component="button"
          onClick={() => onInsert(manifest.name)}
          {...stylex.props(styles.chip)}
        >
          {manifest.name.replace(/^Hb\./, "")}
        </Hb.Box>
      ))}
    </Hb.Box>
  );
}
