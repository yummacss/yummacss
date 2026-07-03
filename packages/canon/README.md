# @yummacss/canon

Class validator for [Yumma CSS](https://yummacss.com). Scans your source files & reports every class that is not part of the Yumma CSS canon - Tailwind habits, typos, & AI hallucinations like `gap-4` instead of `g-4`.

If it's not canon, it doesn't ship.

Validity is checked against the Yumma CSS generator itself, so a class is canon exactly when it produces CSS. Variants (`@sm:`, `h:`), opacity (`/50`), negative values (`m--4`), custom theme colors, prefixes, & safelist entries are all understood.

## Installation

```bash
npm install -D @yummacss/canon
```

## Usage

Run it in any project with a `yumma.config.mjs`:

```bash
npx @yummacss/canon
```

```
Scanned 42 files and found 128 unique classes.
Found 2 classes Yumma CSS does not recognize:
 "gap-4"
  - src/components/hero.tsx
 "items-center"
  - src/components/hero.tsx
```

Exits with code `1` when unknown classes are found - wire it into CI or let your AI agent run it as a feedback loop.

### Allow custom classes

Classes you define in your own CSS are not known to Yumma CSS. Skip them with `--allow`:

```bash
npx @yummacss/canon --allow "docs-container,brand-logo"
```

### Options

| Flag             | Description                                     |
| ---------------- | ----------------------------------------------- |
| `--allow`, `-a`  | Comma-separated class names to skip.            |
| `--config`, `-c` | Path to the config file.                        |

## Programmatic API

```js
import { validate } from "@yummacss/canon";

const result = await validate({ allowlist: ["docs-container"] });

for (const { className, files } of result.invalid) {
	console.log(className, files);
}
```
