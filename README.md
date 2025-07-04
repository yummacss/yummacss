# Yumma CSS API

Yumma CSS utility classes library for all of your development needs.

## All utilities

Return all available utility classes across every category as a single object.

```ts
import { getAllUtils } from "yumma-css-api";

const all = getAllUtils();
```

## Specific utilities

Return only the utility classes for a specific category, such as background, border, or color.

```ts
import { getBackgroundUtils } from "yumma-css-api";

const backgrounds = getBackgroundUtils();
```

## Specific utilities from a category

Return a single utility class definition from a specific category by accessing it via its key (slug) on the returned object.

```ts
import { getBoxModelUtils } from "yumma-css-api";

const boxModel = getBoxModelUtils();

const margin = boxModel["margin"];
```

## Available imports

Return functions to access groups of CSS utility classes.

```ts
import {
  getAllUtils,
  getBackgroundUtils,
  getBorderUtils,
  getBoxModelUtils,
  getColorUtils,
  getEffectUtils,
  getFlexboxUtils,
  getGridUtils,
  getInteractivityUtils,
  getOutlineUtils,
  getPositioningUtils,
  getSvgUtils,
  getTableUtils,
  getTransformUtils,
  getTypographyUtils,
} from "yumma-css-api";
```

## Available types

Return TypeScript types for advanced usage, type safety, and IntelliSense.

```ts
import { UtilityMap, UtilityItem } from "yumma-css-api";
```

## Built with

- [tsup](https://tsup.egoist.dev/) — The simplest and fastest way to build TypeScript libraries.
- [tinycolor2](https://bgrins.github.io/TinyColor/) — Fast, small color manipulation and conversion for JavaScript.

## Licensing

MIT — Copyright (c) 2024–present
