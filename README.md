# @homeassistant-extras/config

Shared dev tooling config for [homeassistant-extras](https://github.com/homeassistant-extras) custom Lovelace cards and libraries.

## Installation

```bash
yarn add -D @homeassistant-extras/config
```

Local sibling checkout:

```json
"@homeassistant-extras/config": "file:../config"
```

Install the peer ESLint/Prettier plugins listed in each card repo's `devDependencies` (same set as before).

## Usage

### Prettier

In `package.json`:

```json
"prettier": "@homeassistant-extras/config/prettier"
```

### NYC

`.nycrc`:

```json
{
  "extends": "@homeassistant-extras/config/nyc"
}
```

### TypeScript

`tsconfig.json`:

```json
{
  "extends": "@homeassistant-extras/config/tsconfig.base.json",
  "compilerOptions": {
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["src/**/*.ts"]
}
```

`tsconfig.test.json`:

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    /* match @homeassistant-extras/config/tsconfig.test.base.json */
  },
  "include": ["test/**/*.ts", "test/**/*.spec.ts", "src/**/*.ts"],
  "exclude": ["node_modules"]
}
```

Copy `compilerOptions` from `tsconfig.test.base.json` (ts-node does not support array `extends` yet).

### ESLint

`eslint.config.mjs`:

```javascript
import { createCardEslintConfig } from "@homeassistant-extras/config/eslint/card";

export default createCardEslintConfig({
  tsconfigRootDir: import.meta.dirname,
});
```

Libraries use `@homeassistant-extras/config/eslint/library`.

### Mocha

Add repo-local requires first, then shared setup:

```json
{
  "require": [
    "./test/helpers/my-stub.cjs",
    "ts-node/register",
    "tsconfig-paths/register",
    "@homeassistant-extras/config/mocha/setup.card",
    "./test/mocha.hooks.ts"
  ],
  "extensions": ["ts"],
  "spec": ["test/**/*.spec.ts"],
  "watch-files": ["src/**/*.ts", "test/**/*.spec.ts"]
}
```
