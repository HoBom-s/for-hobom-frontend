import js from "@eslint/js";
import tseslint from "typescript-eslint";
import importPlugin from "eslint-plugin-import-x";
import stylistic from "@stylistic/eslint-plugin";

/**
 * 모노레포 공통 ESLint 설정.
 * 각 패키지의 eslint.config.js에서 spread하여 사용한다.
 *
 * @example
 * // apps/hobom-system/eslint.config.js
 * import baseConfig from "../../eslint.config.js";
 * export default tseslint.config(...baseConfig, { … });
 */
export const baseIgnores = { ignores: ["**/dist", "**/coverage", "**/node_modules"] };

export const baseConfig = {
  extends: [js.configs.recommended, ...tseslint.configs.recommended],
  files: ["**/*.{ts,tsx}"],
  plugins: {
    "import-x": importPlugin,
    "@stylistic": stylistic,
  },
  rules: {
    // ── TypeScript Strict ──
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unsafe-function-type": "off",
    "@typescript-eslint/ban-ts-comment": [
      "error",
      {
        "ts-ignore": true,
        "ts-expect-error": "allow-with-description",
        "ts-nocheck": true,
        "ts-check": false,
      },
    ],
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/consistent-type-imports": [
      "error",
      {
        prefer: "type-imports",
        fixStyle: "separate-type-imports",
        disallowTypeAnnotations: false,
      },
    ],
    "@typescript-eslint/no-import-type-side-effects": "error",
    "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
    "@typescript-eslint/no-non-null-assertion": "warn",
    "@typescript-eslint/prefer-as-const": "error",
    "@typescript-eslint/no-empty-object-type": "error",
    "@typescript-eslint/no-duplicate-enum-values": "error",
    "@typescript-eslint/no-inferrable-types": "error",
    "@typescript-eslint/no-wrapper-object-types": "error",
    "@typescript-eslint/array-type": ["error", { default: "array" }],

    // ── Import ──
    "import-x/order": [
      "warn",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          ["parent", "sibling", "index"],
          "type",
        ],
        pathGroups: [
          { pattern: "react", group: "builtin", position: "before" },
          { pattern: "react-dom/**", group: "builtin", position: "before" },
          { pattern: "@/**", group: "internal", position: "before" },
        ],
        pathGroupsExcludedImportTypes: ["react", "react-dom"],
        "newlines-between": "never",
        alphabetize: { order: "ignore" },
      },
    ],
    "import-x/no-duplicates": "error",

    // ── Code Quality ──
    "no-console": ["error", { allow: ["warn", "error"] }],
    "no-debugger": "error",
    "no-alert": "error",
    "no-eval": "error",
    "no-implied-eval": "error",
    "no-new-func": "error",
    "no-return-assign": ["error", "except-parens"],
    "no-self-compare": "error",
    "no-throw-literal": "error",
    "no-unmodified-loop-condition": "error",
    "no-useless-concat": "warn",
    "no-useless-return": "warn",
    "no-var": "error",
    "prefer-const": "error",
    "prefer-template": "warn",
    "prefer-arrow-callback": ["warn", { allowNamedFunctions: true }],
    "no-nested-ternary": "warn",
    "no-lonely-if": "warn",
    "no-else-return": ["warn", { allowElseIf: false }],
    "object-shorthand": ["warn", "always"],
    eqeqeq: ["error", "always", { null: "ignore" }],
    curly: ["warn", "multi-line", "consistent"],
    "no-param-reassign": [
      "error",
      {
        props: true,
        ignorePropertyModificationsFor: [
          "draft",
          "acc",
          "e",
          "ctx",
          "req",
          "res",
        ],
      },
    ],
    "no-restricted-syntax": [
      "error",
      {
        selector: "ForInStatement",
        message:
          "for..in은 prototype 속성을 순회합니다. Object.keys/values/entries를 사용하세요.",
      },
    ],

    // ── Stylistic ──
    "@stylistic/padding-line-between-statements": [
      "warn",
      { blankLine: "always", prev: "*", next: "return" },
      { blankLine: "always", prev: ["const", "let"], next: "*" },
      {
        blankLine: "any",
        prev: ["const", "let"],
        next: ["const", "let"],
      },
      { blankLine: "always", prev: "directive", next: "*" },
      { blankLine: "always", prev: "*", next: ["interface", "type"] },
    ],
  },
};

export default tseslint.config(baseIgnores, baseConfig);
