# @yummacss/intellisense

Shared editor intellisense for Yumma CSS.

## Features

- **Completions**: Auto-complete for all Yumma CSS utility classes.
- **Hover**: CSS output and variant context on hover.
- **Color Decorations**: Inline color swatches for color utilities.
- **Conflict Detection**: Warnings when utilities set the same CSS property.
- **Quick Fixes**: One-click resolution for conflicting utilities.
- **Class Sorting**: Opinionated sort by property category.

## Usage

### Monaco

```typescript
import {
  registerCompletionProvider,
  registerHoverProvider,
  registerColorProvider,
  registerConflictMarkers,
  registerCodeActionsProvider,
  registerSortAction,
} from '@yummacss/intellisense/monaco';

registerCompletionProvider(monaco);
registerHoverProvider(monaco);
registerColorProvider(monaco);
registerCodeActionsProvider(monaco);
registerConflictMarkers(monaco, editor);
registerSortAction(monaco, editor);
```

**For styling projects, use [yummacss](https://www.npmjs.com/package/yummacss) instead.**

## Documentation

Learn more at [yummacss.com](https://yummacss.com)
