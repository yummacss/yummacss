# @yummacss/lint

Lint rules for [Yumma CSS](https://yummacss.com), for Oxlint.

## Installation

```bash
pnpm add -D oxlint @yummacss/lint
```

## Usage

A JS plugin for Oxlint. It reads `yumma.config.mjs` from where the linter runs, so your own colors and states pass.

```json
// .oxlintrc.json
{
  "jsPlugins": ["@yummacss/lint"],
  "rules": {
    "yummacss/no-unknown-classes": "error",
    "yummacss/no-inline-styles": "warn"
  }
}
```

The plugin uses the ESLint plugin format, which is what Oxlint loads, so ESLint can run it too.

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

Skip one line with `// oxlint-disable-next-line yummacss/no-unknown-classes`.

For a one-off check without a linter, run `yummacss lint` from the `yummacss` package.

## Documentation

Learn more at [yummacss.com](https://yummacss.com)
