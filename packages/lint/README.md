# @yummacss/lint

Class validator for [Yumma CSS](https://yummacss.com). Reports every class that is not part of the Yumma CSS canon.

## Installation

```bash
pnpm add -D @yummacss/lint
```

## Usage

```bash
pnpm dlx @yummacss/lint
```

Validates against the Yumma CSS generator itself. Variants, opacity, negative values, custom theme colors, prefixes, and safelist entries are all understood.

Skip custom classes with `--allow`:

```bash
pnpm dlx @yummacss/lint --allow "docs-container,brand-logo"
```

## Lint rules

`@yummacss/lint/plugin` is a lint plugin for Oxlint and ESLint. It reads `yumma.config.mjs` from where the linter runs.

```json
// .oxlintrc.json
{
  "jsPlugins": ["@yummacss/lint/plugin"],
  "rules": {
    "yummacss/canon": ["error", { "allow": ["docs-container"] }],
    "yummacss/prefer-class": "warn"
  }
}
```

```js
// eslint.config.js
import yummacss from "@yummacss/lint/plugin";

export default [{ plugins: { yummacss }, rules: { "yummacss/canon": "error" } }];
```

- `yummacss/canon` reports a class Yumma CSS does not generate, with the closest class that does.
- `yummacss/prefer-class` reports an inline style a class already writes, such as `display: "flex"` for `d:f`.

Skip one line with `// eslint-disable-next-line yummacss/canon`, which both linters read.

## API

```js
import { validate } from "@yummacss/lint";

const result = await validate({ allowlist: ["docs-container"] });
```

## Documentation

Learn more at [yummacss.com](https://yummacss.com)
