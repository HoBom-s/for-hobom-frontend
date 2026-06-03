import type { ComponentManifest } from "./manifest.model";

/** `Hb.TextField` 매니페스트. 자식 없이 prop으로 구성. */
export const textFieldManifest: ComponentManifest = {
  name: "Hb.TextField",
  import: { source: "hobom-design-system", access: "Hb.TextField" },
  category: "input",
  props: {
    label: { kind: "string", default: "Label" },
    placeholder: { kind: "string", default: "" },
    disabled: { kind: "boolean", default: false },
  },
};
