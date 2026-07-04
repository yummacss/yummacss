# @yummacss/postcss

PostCSS plugin for [Yumma CSS](https://yummacss.com). Works anywhere PostCSS runs! Next.js with both Turbopack and Webpack.

## Installation

```bash
npm install -D @yummacss/postcss
```

## Usage

Add the plugin to your PostCSS config:

```js
// postcss.config.mjs
export default {
	plugins: {
		"@yummacss/postcss": {},
	},
};
```

Add the `@yummacss;` marker to your CSS entry file where the generated CSS should be injected:

```css
/* globals.css */
@yummacss;
```

Configure Yumma CSS as usual in `yumma.config.mjs`:

```js
import { defineConfig } from "yummacss";

export default defineConfig({
	source: ["./src/**/*.{ts,tsx}"],
});
```

That's it! Now run `next dev` (Turbopack or Webpack) and the CSS regenerates automatically as you edit your source files. The `output` option is not used by the plugin.

## Options

| Option       | Type     | Default             | Description                                    |
| ------------ | -------- | ------------------- | ---------------------------------------------- |
| `config`     | `Config` | —                   | Inline configuration; skips the config file.   |
| `configPath` | `string` | `yumma.config.mjs`  | Path to the config file.                       |
| `cwd`        | `string` | `process.cwd()`     | Directory to resolve config and globs from.    |
