import type { ComponentManifest } from "./manifest.model";

/** `Hb.Text` 매니페스트. 텍스트 내용은 자식 텍스트 노드로 둔다. */
export const textManifest: ComponentManifest = {
  name: "Hb.Text",
  import: { source: "hobom-design-system", access: "Hb.Text" },
  category: "typography",
  props: {
    variant: {
      kind: "enum",
      values: ["h6", "body1", "body2", "caption"],
      default: "body1",
    },
    children: { kind: "slot", accepts: ["text"] },
  },
};
