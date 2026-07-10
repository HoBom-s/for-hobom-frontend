import { RuleTester } from "eslint";
import { rule } from "../../eslint-rules/fsd-boundaries.js";

const ruleTester = new RuleTester({
  languageOptions: { ecmaVersion: "latest", sourceType: "module" },
});

const file = (layer: string, slice: string) =>
  `/repo/apps/hobom-system/src/${layer}/${slice}/thing.ts`;

ruleTester.run("fsd-boundaries", rule, {
  valid: [
    // entities may import shared
    { code: `import { x } from "@/shared/y";`, filename: file("entities", "note") },
    // re-export within the allowed direction
    { code: `export { x } from "@/shared/y";`, filename: file("features", "auth") },
    // apps may lazy-load pages
    { code: `const p = import("@/pages/home");`, filename: file("apps", "app-router") },
    // same-slice import via a relative path is fine
    { code: `import { x } from "./api/note.queries";`, filename: file("entities", "note") },
    // a slice's UI barrel is a sanctioned second public entry (cross-slice)
    { code: `import { Card } from "@/entities/note/ui";`, filename: file("features", "board") },
    // non-literal dynamic import is ignored
    { code: `const p = import(dynamicPath);`, filename: file("entities", "note") },
    // deep import into a sliceless layer's segment is fine
    { code: `import { httpClient } from "@/shared/api";`, filename: file("entities", "note") },
  ],
  invalid: [
    // entities cannot import features (static)
    {
      code: `import { x } from "@/features/auth";`,
      filename: file("entities", "note"),
      errors: [{ messageId: "crossLayer" }],
    },
    // …nor via a re-export
    {
      code: `export * from "@/features/auth";`,
      filename: file("entities", "note"),
      errors: [{ messageId: "crossLayer" }],
    },
    // …nor via a dynamic import
    {
      code: `const p = import("@/features/auth");`,
      filename: file("entities", "note"),
      errors: [{ messageId: "crossLayer" }],
    },
    // cross-slice import within the same layer
    {
      code: `import { x } from "@/features/billing";`,
      filename: file("features", "auth"),
      errors: [{ messageId: "crossSlice" }],
    },
    // importing your own slice via the @/ alias (self-barrel) must be relative
    {
      code: `import { x } from "@/entities/note";`,
      filename: file("entities", "note"),
      errors: [{ messageId: "ownSliceAlias" }],
    },
    // …including a deeper own-slice path
    {
      code: `import { x } from "@/entities/note/api/note.queries";`,
      filename: file("entities", "note"),
      errors: [{ messageId: "ownSliceAlias" }],
    },
    // deep import into another slice's internals (past root and /ui)
    {
      code: `import { x } from "@/entities/note/model/note.model";`,
      filename: file("features", "board"),
      errors: [{ messageId: "deepImport" }],
    },
  ],
});
