import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { baseIgnores, baseConfig } from "../../eslint.config.js";
import * as fsdBoundariesRule from "./eslint-rules/fsd-boundaries.js";

export default tseslint.config(baseIgnores, {
  ...baseConfig,
  files: ["**/*.{ts,tsx}"],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
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
