import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: { plugins: { "@typescript-eslint": {} } },
});

// Simplified configuration to reduce peer dependency conflicts
const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      parserOptions: {
        project: "./tsconfig.json"
      }
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
      noInlineConfig: false
    },
  },
];

export default eslintConfig;
