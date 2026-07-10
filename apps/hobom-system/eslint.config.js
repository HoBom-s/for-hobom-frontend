import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { baseIgnores, baseConfig } from "../../eslint.config.js";
import * as fsdBoundariesRule from "./eslint-rules/fsd-boundaries.js";

export default tseslint.config(baseIgnores, {
  ...baseConfig,
  // Type-aware linting (app only for now — the packages follow separately).
  extends: [...(baseConfig.extends ?? []), ...tseslint.configs.recommendedTypeChecked],
  files: ["**/*.{ts,tsx}"],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
    parserOptions: {
      // Config/declaration files outside the TS build project lint under an
      // inferred default project so type-aware rules don't choke on them.
      projectService: {
        allowDefaultProject: ["vitest.config.ts", "eslint-rules/fsd-boundaries.d.ts"],
      },
      tsconfigRootDir: import.meta.dirname,
    },
  },
  plugins: {
    ...baseConfig.plugins,
    "react-hooks": reactHooks,
    "react-refresh": reactRefresh,
    "fsd-boundaries": {
      rules: {
        "fsd-boundaries": fsdBoundariesRule.rule,
      },
    },
  },
  rules: {
    ...baseConfig.rules,

    // ── Type-checked: `any`-leak family deferred ──
    // These need the source of each `any` typed; tracked as a follow-up so the
    // high-signal async/assertion rules can land now. See ADR / PR notes.
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unsafe-return": "off",
    "@typescript-eslint/no-unsafe-argument": "off",

    // Async JSX event handlers (`onClick={async …}`) are idiomatic React and
    // safe — React discards the returned promise. Keep the rule for the risky
    // cases (a promise passed to a void callback like `forEach`, or used in a
    // condition), but allow it on attributes.
    "@typescript-eslint/no-misused-promises": [
      "error",
      { checksVoidReturn: { attributes: false } },
    ],

    // ── React ──
    ...reactHooks.configs.recommended.rules,
    "react-hooks/set-state-in-effect": "off",
    // Read-once init-guard refs during render are intentional here; matches the
    // library packages, which already disable this compiler-ruleset check.
    "react-hooks/refs": "off",
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],

    // ── FSD Architecture ──
    "fsd-boundaries/fsd-boundaries": "error",

    // ── Design system boundary ──
    // The app must consume UI through hobom-design-system, never the
    // underlying styling engine directly. This keeps product code decoupled
    // from the engine so it can be swapped without app changes.
    "@typescript-eslint/no-restricted-imports": [
      "error",
      {
        patterns: [
          {
            group: ["@mui", "@mui/*", "@emotion", "@emotion/*"],
            message:
              "Import from 'hobom-design-system' instead of the styling engine directly.",
          },
        ],
      },
    ],
  },
});
