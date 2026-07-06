import tseslint from "typescript-eslint";
import { baseIgnores, baseConfig } from "../../eslint.config.js";

export default tseslint.config(baseIgnores, {
  ...baseConfig,
  rules: {
    ...baseConfig.rules,
    "@typescript-eslint/ban-ts-comment": [
      "error",
      {
        "ts-ignore": true,
        "ts-expect-error": "allow-with-description",
        "ts-nocheck": true,
        "ts-check": false,
        minimumDescriptionLength: 0,
      },
    ],
  },
});
