import type { ComponentManifest } from "./manifest.model";

/** `Hb.Card.Root` 매니페스트. 컨테이너 — 임의 컴포넌트를 자식으로 받는다. */
export const cardManifest: ComponentManifest = {
  name: "Hb.Card.Root",
  import: { source: "hobom-design-system", access: "Hb.Card.Root" },
  category: "layout",
  props: {
    variant: { kind: "enum", values: ["outlined", "elevation"], default: "outlined" },
    children: { kind: "slot", accepts: ["*"] },
  },
};
