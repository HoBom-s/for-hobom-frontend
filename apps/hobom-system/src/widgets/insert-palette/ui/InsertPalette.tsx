import { Hb } from "@/shared/ui";
import { listManifests, type ComponentKey } from "@/entities/manifest";

interface InsertPaletteProps {
  onInsert: (key: ComponentKey) => void;
}

/** 등록된 컴포넌트를 칩 목록으로 보여준다. 클릭하면 선택된 컨테이너(또는 루트)에 추가. */
export function InsertPalette({ onInsert }: InsertPaletteProps) {
  return (
    <Hb.Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, p: 1.5 }}>
      {listManifests().map((manifest) => (
        <Hb.Box
          key={manifest.name}
          component="button"
          onClick={() => onInsert(manifest.name)}
          sx={{
            border: 1,
            borderColor: "divider",
            borderRadius: 1,
            bgcolor: "transparent",
            color: "text.primary",
            fontFamily: "inherit",
            fontSize: 12,
            px: 1,
            py: 0.5,
            cursor: "pointer",
            transition: "background-color 0.12s",
            "&:hover": { bgcolor: "action.hover" },
          }}
        >
          {manifest.name.replace(/^Hb\./, "")}
        </Hb.Box>
      ))}
    </Hb.Box>
  );
}
