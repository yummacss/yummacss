# Changelog

All notable changes to the Yumma CSS will be documented in this file.

## [2.1.0]

### Added

- Add `_borders.scss`, `_box-model.scss`, `_effects.scss`, `_filters.scss`, `_flexbox.scss`, `_grid.scss`, `_layout.scss`, `_interactions.scss`, `_outlines.scss`, `_tables.scss` and `_typography.scss`
- Add `_extensions.scss` and `_theme.scss`
- Add `cursor: pointer` to all `<button>` element
- Add the `0` value to **Opacity** utility variant
- Add the `auto` property to **Flex** utility variant

### Changed

- New `baseline` **Align Content** utility variant
- New `baseline` **Align Items** utility variant
- New `cg-0` **Column Gap** and `rg-0` **Row Gap** utilities
- New `col-resize`, `default`, `ne-resize`, `nesw-resize`, `none`, `nw-resize`, `nwse-resize`, `progress`, `row-resize`, `s-resize`, `se-resize`, `sw-resize`, `w-resize`, `zoom-in`, `zoom-out` **Cursor** utility properties
- New `f-b` **Font Size** base utility
- New `font-size: inherit` and `font-weight: inherit` properties for heading and paragraph elements.
- New `fs-9xl` **Font Size** utility variant
- New `row dense` and `dense row` **Grid Auto Flow** utility variants
- New `table`, `inline-table` and `inline-grid` **Display** utility variants
- New `text` and `all` **User Select** utility variants
- Rename **Align Content** utility syntax from `ac-stretch` to `ac-s`
- Rename **Align Items** utility syntax from `ai-stretch` to `ai-s`
- Rename **Align Self** utility syntax from `as-stretch` to `as-s`
- Rename **Justify Items** utility syntax from `ji-stretch` to `ji-st`
- Rename **Justify Self** utility syntax from `js-stretch` to `ji-st`
- Rename **Object Position** utility syntax from `op-left` to `op-l`
- Rename **Position** utility syntax from `p-t` to `p-y`
- Rename **Position** utility syntax from `p-y` to `p-st`
- Rename `_miscellaneous.scss` to `_interactions.scss`
- Rename `$yma-direction` base value from `1px` to `0.25rem`
- Rename color variables from `$yma-colors-*` to `$yma-theme-*`
- Update **Border Radius** base value from `4px` to `0.25rem`
- Update **Border Width** base value from `4px` to `1px`
- Update **Flex Basis** base value from `1rem` to `0.25rem`
- Update **Flex** utility variants
- Update **Outline Offset** base value from `2px` to `1px`
- Update **Outline Width** base value from `2px` to `1px`
- Update **Spacing X** and **Spacing Y** calculations

### Removed

- Delete `_utilities.scss` partial
- Remove `end` and `start` properties from **Align Content** utilities
- Remove `end` and `start` properties from **Align Items** utilities
- Remove `end` and `start` properties from **Align Self** utilities
- Remove `end`, `left`, `right` and `start` properties from **Justify Content** utilities
- Remove `er` **Cursor** variant
- Remove `flex-end`, `flex-start`, `left`, `normal` and `right` properties from **Justify Items** utilities
- Remove `flex-end`, `flex-start`, `left`, `normal`, `right` and `stretch` properties from **Justify Self** utilities
- Remove `hidden` property in **Border Style** utilities
- Remove `hidden` property in **Outline Style** utilities
- Remove variable inside **Spacing X** and **Spacing Y** utilities

## [Unreleased]

### Added

- Add `$yma-box-shadow-*` variables
- Add `yummacss.config.js` file
- Add Yumma CSS CLI

### Changes

- Merge **Filters** and **Effects** subcategories into a **FX** category

### Removed

- None