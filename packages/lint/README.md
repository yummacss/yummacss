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

## API

```js
import { validate } from "@yummacss/lint";

const result = await validate({ allowlist: ["docs-container"] });
```

## Documentation

Learn more at [yummacss.com](https://yummacss.com)
