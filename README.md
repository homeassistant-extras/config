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

## Publishing

This package ships config files only — there is no build step. Published artifacts are listed in `package.json` `files`.

Repository: [github.com/homeassistant-extras/config](https://github.com/homeassistant-extras/config)

**GitHub and npm are separate.** Pushing to GitHub (`git push`) does **not** put the package on npm. Consumers install from the npm registry with `yarn add -D @homeassistant-extras/config` only after you run `npm publish` from this directory.

Check whether npm has the package:

```bash
npm view @homeassistant-extras/config version
```

If that returns `404`, publish has not happened yet (or the version does not exist).

### Prerequisites

- npm account with access to the `@homeassistant-extras` scope (org member on [npmjs.com](https://www.npmjs.com/org/homeassistant-extras))
- GitHub SSH access to `git@github.com:homeassistant-extras/config.git`

### One-time: log in to npm

```bash
npm login
```

Verify:

```bash
npm whoami
```

You should see your npm username. If publish fails with 403, ask an org owner to add you to the `@homeassistant-extras` team on npm.

### First release (git + npm)

From the repo root:

```bash
yarn install
git add .
git commit -m "Initial release."
git push -u origin main
npm publish
```

`publishConfig.access` is set to `public` in `package.json`, so the scoped package publishes publicly without passing `--access public`.

Preview what npm would ship (optional):

```bash
npm pack --dry-run
```

### Subsequent releases

1. Bump `version` in `package.json` ([semver](https://semver.org/)).
2. Commit, tag, and push:

```bash
git add package.json
git commit -m "chore: release v0.1.1"
git tag v0.1.1
git push origin main --tags
```

3. Publish:

```bash
npm publish
```

### Install after publish

Replace local `file:../config` in consuming repos with:

```json
"@homeassistant-extras/config": "^0.1.0"
```

Then:

```bash
yarn install
```

Or install directly:

```bash
yarn add -D @homeassistant-extras/config
```

### Install from GitHub (before npm publish)

If the repo is on GitHub but not npm yet, use a git dependency:

```json
"@homeassistant-extras/config": "git+ssh://git@github.com/homeassistant-extras/config.git#v0.1.0"
```

Then `yarn install`. Prefer npm once `@homeassistant-extras/config` is published — installs are faster and semver ranges work with `yarn upgrade`.
