import tseslint from "typescript-eslint";
import { baseIgnores, baseConfig } from "../../eslint.config.js";

export default tseslint.config(baseIgnores, {
  ...baseConfig,
  rules: {
    ...baseConfig.rules,
    // noname 라이브러리 소스 — 제네릭 유틸리티 특성상 any 허용
    "@typescript-eslint/no-explicit-any": "warn",
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
