# @yummacss/canon

Class validator for [Yumma CSS](https://yummacss.com). Reports every class that is not part of the Yumma CSS canon.

## Installation

```bash
pnpm add -D @yummacss/canon
```

## Usage

```bash
pnpm dlx @yummacss/canon
```

Validates against the Yumma CSS generator itself. Variants, opacity, negative values, custom theme colors, prefixes, and safelist entries are all understood.

Skip custom classes with `--allow`:

```bash
pnpm dlx @yummacss/canon --allow "docs-container,brand-logo"
```

## API

```js
import { validate } from "@yummacss/canon";

const result = await validate({ allowlist: ["docs-container"] });
```

## Documentation

Learn more at [yummacss.com](https://yummacss.com)
