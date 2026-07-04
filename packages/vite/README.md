# @yummacss/vite

Vite plugin for [Yumma CSS](https://yummacss.com). Works with any Vite-based setup like SvelteKit, Astro, Nuxt, Solid, plain Vite.

## Installation

```bash
npm install -D @yummacss/vite
```

## Usage

Add the plugin to your Vite config:

```js
// vite.config.js
import yummacss from "@yummacss/vite";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [yummacss()],
});
```

Add the `@yummacss;` marker to your CSS entry file where the generated CSS should be injected:

```css
/* main.css */
@yummacss;
```

Configure Yumma CSS as usual in `yumma.config.mjs`:

```js
import { defineConfig } from "yummacss";

export default defineConfig({
	source: ["./src/**/*.{ts,tsx}"],
});
```

That's it! Now `vite dev` hot-swaps the generated CSS as you edit your source files, without a full page reload. The `output` option is not used by the plugin.

## Options

| Option       | Type     | Default            | Description                                  |
| ------------ | -------- | ------------------ | -------------------------------------------- |
| `config`     | `Config` | —                  | Inline configuration; skips the config file. |
| `configPath` | `string` | `yumma.config.mjs` | Path to the config file.                     |
