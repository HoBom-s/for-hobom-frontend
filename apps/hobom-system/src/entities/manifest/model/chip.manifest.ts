import type { ComponentManifest } from "./manifest.model";

/** `Hb.Chip` 매니페스트. label prop으로 구성, 자식 없음. */
export const chipManifest: ComponentManifest = {
  name: "Hb.Chip",
  import: { source: "hobom-design-system", access: "Hb.Chip" },
  category: "data-display",
  props: {
    label: { kind: "string", default: "Chip" },
    variant: { kind: "enum", values: ["filled", "outlined"], default: "filled" },
  },
};
