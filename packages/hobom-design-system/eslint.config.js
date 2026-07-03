import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { baseIgnores, baseConfig } from "../../eslint.config.js";

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
  },
  rules: {
    ...baseConfig.rules,
    ...reactHooks.configs.recommended.rules,
    "react-hooks/refs": "off",
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
  },
}, {
  // The public barrel must stay engine-free. Components may wrap the engine
  // internally, but the styling/theme surface is re-exported only through
  // foundations/styling.ts — the single place that touches it publicly.
  files: ["src/index.ts"],
  rules: {
    "@typescript-eslint/no-restricted-imports": [
      "error",
      {
        patterns: [
          {
            group: ["@mui", "@mui/*"],
            message:
              "Keep the public barrel engine-free. Re-export from foundations/styling.ts instead.",
          },
        ],
      },
    ],
  },
});
