import eslint from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

const tsFiles = ["src/**/*.ts", "test/**/*.ts"];

/**
 * ESLint config for TypeScript library packages (no Lit card rules).
 *
 * @param {object} [options]
 * @param {string} [options.tsconfigRootDir] ESLint project root (defaults to caller directory).
 * @param {string[]} [options.ignores] Additional global ignore globs.
 */
export function createLibraryEslintConfig(options = {}) {
  const { tsconfigRootDir = import.meta.dirname, ignores = [] } = options;

  return defineConfig(
    globalIgnores([
      "coverage/**",
      "dist/**",
      "node_modules/**",
      ".nyc_output/**",
      "eslint.config.mjs",
      "test/**/*.cjs",
      ...ignores,
    ]),
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
      files: tsFiles,
      rules: {
        "@typescript-eslint/consistent-type-imports": [
          "error",
          { prefer: "type-imports", fixStyle: "inline-type-imports" },
        ],
        "@typescript-eslint/unbound-method": "off",
        "@typescript-eslint/no-floating-promises": "error",
        "@typescript-eslint/no-misused-promises": "error",
        "@typescript-eslint/require-await": "error",
        eqeqeq: ["error", "always", { null: "ignore" }],
        "no-console": ["warn", { allow: ["warn", "error", "info"] }],
        "no-duplicate-imports": "error",
        "no-throw-literal": "error",
        "prefer-const": "error",
      },
    },
    {
      files: ["src/**/*.ts"],
      languageOptions: {
        parserOptions: {
          projectService: true,
          tsconfigRootDir,
        },
      },
    },
    {
      files: ["test/**/*.ts"],
      languageOptions: {
        parserOptions: {
          project: "./tsconfig.test.json",
          tsconfigRootDir,
        },
        globals: {
          ...globals.browser,
          ...globals.node,
          ...globals.mocha,
        },
      },
      rules: {
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/consistent-type-imports": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-require-imports": "off",
        "@typescript-eslint/no-unnecessary-type-assertion": "off",
        "@typescript-eslint/no-unused-expressions": "off",
        "@typescript-eslint/no-wrapper-object-types": "off",
        "@typescript-eslint/unbound-method": "off",
      },
    },
  );
}
