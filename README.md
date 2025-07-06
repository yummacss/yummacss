# [@yummacss/api](https://www.npmjs.com/package/@yummacss/api)

Yumma CSS utility classes for all your development needs.

[![NPM Version](https://img.shields.io/npm/v/@yummacss/api?style=plastic&label=@yummacss/api&labelColor=eaedfc&color=413cb8)](https://www.npmjs.com/package/@yummacss/api)
[![NPM Downloads](https://img.shields.io/npm/d18m/@yummacss/api?style=plastic&label=downloads&labelColor=eaedfc&color=413cb8)](https://www.npmjs.com/package/@yummacss/api)

## Getting started

Yumma CSS API is a powerful TypeScript/JavaScript utility library that provides programmatic access to Yumma CSS class definitions.

### Installing

```bash
npm i @yummacss/api
```

## Usage examples

Get all utilities at once:

```ts
import { getAllUtils } from "@yummacss/api";

const all = getAllUtils();
```

Get only background utilities:

```ts
import { getBackgroundUtils } from "@yummacss/api";

const backgrounds = getBackgroundUtils();
```

Access a specific utility from a category:

```ts
import { getBoxModelUtils } from "@yummacss/api";

const boxModel = getBoxModelUtils();
const margin = boxModel["margin"];
```

## Available API

Import utility group functions individually:

```ts
import {
  getAllUtils,
  getBackgroundUtils,
  getBorderUtils,
  getBoxModelUtils,
  getColorUtils,
  getEffectUtils,
  getFlexboxUtils,
  getFontUtils,
  getGridUtils,
  getInteractivityUtils,
  getOutlineUtils,
  getPositioningUtils,
  getSvgUtils,
  getTableUtils,
  getTextUtils,
  getTransformUtils,
} from "@yummacss/api";
```

For advanced use cases use these types:

```ts
import type { UtilityMap, UtilityItem } from "@yummacss/api";
```

## Built with

- [tsup](https://tsup.egoist.dev/) — The simplest and fastest way to build TypeScript libraries.
- [tinycolor2](https://bgrins.github.io/TinyColor/) — Fast, small color manipulation and conversion for JavaScript.

## License

This project is licensed under the [MIT License](LICENSE)
