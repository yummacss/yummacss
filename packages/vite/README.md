# @yummacss/vite

Vite plugin for [Yumma CSS](https://yummacss.com).

## Installation

```bash
npm install -D @yummacss/vite
```

## Usage

```js
import yummacss from "@yummacss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [yummacss()],
});
```

Add `@yummacss;` to your CSS entry file.

## Options

| Option       | Type     | Default            | Description                                  |
| ------------ | -------- | ------------------ | -------------------------------------------- |
| `config`     | `Config` | -                  | Inline configuration; skips the config file. |
| `configPath` | `string` | `yumma.config.mjs` | Path to the config file.                     |

## Documentation

Learn more at [yummacss.com](https://yummacss.com)
