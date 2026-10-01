# @yummacss/lint

Class validator and lint rules for [Yumma CSS](https://yummacss.com). Reports every class Yumma CSS does not generate.

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

`@yummacss/lint/plugin` is one plugin for Oxlint and ESLint. It reads `yumma.config.mjs` from where the linter runs, so your own colors and states pass.

```json
// .oxlintrc.json
{
  "jsPlugins": ["@yummacss/lint/plugin"],
  "rules": {
    "yummacss/no-unknown-classes": "error",
    "yummacss/no-inline-styles": "warn"
  }
}
```

```js
// eslint.config.js
import { plugin as yummacss } from "@yummacss/lint/plugin";

export default [{ plugins: { yummacss }, rules: { "yummacss/no-unknown-classes": "error" } }];
```

| Rule | What it reports |
| --- | --- |
| `no-unknown-classes` | A class Yumma CSS does not generate, such as `bg:redd-5`, with the closest class that exists. |
| `no-inline-styles` | A property in a `style` object, with the class that writes the same declaration, such as `d:f` for `display: "flex"`. Custom properties pass. |

Both rules read `className` and `class`, and the arguments of `cn`, `cx`, `clsx`, `classNames` and `merge` from `yummacss/merge`.

### Options

Every rule takes `allow` and `message`.

```json
"yummacss/no-unknown-classes": ["error", {
  "allow": ["footer-version", "editor-*"],
  "message": "{{className}} is not on the scale. Did you mean {{suggestions}}?"
}]
```

- `allow` lists class names, or CSS property names for `no-inline-styles`. A trailing `*` matches a prefix.
- `message` replaces the rule's text. `{{className}}`, `{{property}}` and `{{suggestions}}` are filled in.

Skip one line with `// eslint-disable-next-line yummacss/no-unknown-classes`, which both linters read.

## API

```js
import { validate } from "@yummacss/lint";

const result = await validate({ allowlist: ["docs-container"] });
```

## Documentation

Learn more at [yummacss.com](https://yummacss.com)
