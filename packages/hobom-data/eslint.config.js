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
    // Library source (context + provider + hook colocated); Fast Refresh is an
    // app-HMR heuristic that doesn't apply to published package source.
    "react-refresh/only-export-components": "off",
  },
});
