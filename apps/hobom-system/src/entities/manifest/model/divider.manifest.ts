import type { ComponentManifest } from "./manifest.model";

/** `Hb.Divider` 매니페스트. prop·자식 없는 단순 구분선. */
export const dividerManifest: ComponentManifest = {
  name: "Hb.Divider",
  import: { source: "hobom-design-system", access: "Hb.Divider" },
  category: "layout",
  props: {},
};
