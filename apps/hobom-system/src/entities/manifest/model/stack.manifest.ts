import type { ComponentManifest } from "./manifest.model";

/** `Hb.Stack` 매니페스트. 흐름(flex) 레이아웃 컨테이너 — 임의 컴포넌트를 자식으로 받는다. */
export const stackManifest: ComponentManifest = {
  name: "Hb.Stack",
  import: { source: "hobom-design-system", access: "Hb.Stack" },
  category: "layout",
  props: {
    direction: { kind: "enum", values: ["row", "column"], default: "column" },
    justifyContent: {
      kind: "enum",
      values: ["flex-start", "center", "flex-end", "space-between"],
      default: "flex-start",
    },
    alignItems: {
      kind: "enum",
      values: ["flex-start", "center", "flex-end", "stretch"],
      default: "stretch",
    },
    gap: { kind: "number", default: 2 },
    padding: { kind: "number", default: 0 },
    children: { kind: "slot", accepts: ["*"] },
  },
};
