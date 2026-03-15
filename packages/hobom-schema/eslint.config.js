import tseslint from "typescript-eslint";
import { baseIgnores, baseConfig } from "../../eslint.config.js";

export default tseslint.config(baseIgnores, {
  ...baseConfig,
  rules: {
    ...baseConfig.rules,
    "@typescript-eslint/no-explicit-any": "warn",
  },
});
