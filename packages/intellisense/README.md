# @yummacss/intellisense

Shared editor intellisense for Yumma CSS.

## Use cases

- Building editor extensions or IDE plugins
- Adding Yumma CSS intellisense to a Monaco-based playground or editor
- Extending support to new editors via the framework-agnostic core

**For styling projects, use [yummacss](https://www.npmjs.com/package/yummacss) instead.**

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

### VS Code

```typescript
import {
  CompletionProvider,
  HoverProvider,
  ColorProvider,
  ActionProvider,
  subscribeToDocChanges,
  registerSortCommand,
} from '@yummacss/intellisense/vscode';
```

## Features

- **Completions** - autocomplete for all Yumma CSS utility classes
- **Hover** - CSS output, variant context, and docs link on hover
- **Color decorations** - color swatches inline for color utilities
- **Conflict detection** - warnings when utilities set the same CSS property
- **Quick fixes** - one-click resolution for conflicting utilities
- **Class sorting** - opinionated sort order based on property category

Learn more at [yummacss.com](https://yummacss.com)