# @yummacss/core

Core utility definitions for Yumma CSS.

## Use cases

- Building editor extensions or IDE plugins
- Creating custom build tools or integrations
- Analyzing or documenting Yumma CSS utilities
- Generating utility references programmatically

**For styling projects, use [yummacss](https://www.npmjs.com/package/yummacss) instead.**

## Usage
```typescript
import { coreUtils, colorUtils, boxModelUtils } from '@yummacss/core';

// Get all utilities
const allUtils = coreUtils();

// Get specific utility groups
const colors = colorUtils();
const spacing = boxModelUtils();

// Access utility definitions
console.log(allUtils['background-color']);
// {
//   prefix: 'bg',
//   properties: ['background-color'],
//   values: { ... },
//   variants: { ... }
// }
```

## Utility Reference

Each utility export returns a `Utilities` object containing utility definitions with:

- `prefix` - Class name prefix (e.g., `bg` for `bg-red`)
- `properties` - CSS properties this utility controls
- `values` - Available values and their CSS outputs
- `variants` - Supported variants (hover, media queries, etc.)


Learn more at [yummacss.com/docs/core-module](https://yummacss.com/docs/core-module)

