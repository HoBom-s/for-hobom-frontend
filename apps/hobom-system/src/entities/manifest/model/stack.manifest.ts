import type { ComponentManifest } from "./manifest.model";

/** `Hb.Stack` 매니페스트. 흐름(flex) 레이아웃 컨테이너 — 임의 컴포넌트를 자식으로 받는다. */
export const stackManifest: ComponentManifest = {
  name: "Hb.Stack",
  import: { source: "hobom-design-system", access: "Hb.Stack" },
  category: "layout",
  props: {
    direction: { kind: "enum", values: ["row", "column"], default: "column" },
    gap: { kind: "number", default: 2 },
    children: { kind: "slot", accepts: ["*"] },
  },
};
