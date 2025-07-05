import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";

import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["./src/**/*.ts"],

    languageOptions: {
      parser: tsparser,
      sourceType: "module",
      ecmaVersion: "latest",
    },

    plugins: {
      "@typescript-eslint": tseslint,
      prettier: prettierPlugin,
    },

    rules: {
      // Recommended
      ...tseslint.configs.recommended.rules,
      ...prettierConfig.rules,

      // General
      semi: ["warn", "always"],
      quotes: ["warn", "double"],
      "no-console": ["warn", { allow: ["info", "warn", "error"] }],
      "no-unused-vars": "off",

      // Typescript
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/explicit-function-return-type": "warn",
      "@typescript-eslint/explicit-member-accessibility": "warn",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
    },
  },
]);
