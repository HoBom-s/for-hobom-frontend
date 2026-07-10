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
    // same-slice relative import is fine
    { code: `import { x } from "@/entities/note";`, filename: file("entities", "note") },
    // non-literal dynamic import is ignored
    { code: `const p = import(dynamicPath);`, filename: file("entities", "note") },
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
  ],
});
