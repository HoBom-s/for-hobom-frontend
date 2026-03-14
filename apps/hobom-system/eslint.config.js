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
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],

    // ── FSD Architecture ──
    "fsd-boundaries/fsd-boundaries": "error",
  },
});
