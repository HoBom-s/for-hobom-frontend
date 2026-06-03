import type { ComponentManifest } from "./manifest.model";

/**
 * `Hb.Button` 매니페스트.
 * 실제 계약 출처: packages/hobom-design-system/src/hb/Button.tsx
 */
export const buttonManifest: ComponentManifest = {
  name: "Hb.Button",
  import: { source: "hobom-design-system", access: "Hb.Button" },
  category: "actions",
  props: {
    variant: {
      kind: "enum",
      values: ["primary", "secondary", "danger", "ghost"],
      default: "primary",
    },
    disabled: { kind: "boolean", default: false },
    children: { kind: "slot", accepts: ["text"] },
  },
};
