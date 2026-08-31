# @yummacss/postcss

PostCSS plugin for [Yumma CSS](https://yummacss.com).

## Installation

```bash
pnpm add -D @yummacss/postcss
```

## Usage

```js
export default {
  plugins: {
    "@yummacss/postcss": {},
  },
};
```

Add `@yummacss;` to your CSS entry file.

## Options

| Option       | Type     | Default             | Description                                    |
| ------------ | -------- | ------------------- | ---------------------------------------------- |
| `config`     | `Config` | -                   | Inline configuration; skips the config file.   |
| `configPath` | `string` | `yumma.config.mjs`  | Path to the config file.                       |
| `cwd`        | `string` | `process.cwd()`     | Directory to resolve config and globs from.    |

## Documentation

Learn more at [yummacss.com](https://yummacss.com)
