# Changelog

All notable changes to the Yumma CSS will be documented in this file.

# Changelog

All notable changes to the Yumma CSS will be documented in this file.

## [2.0.0]

### Added

- Add **Accent Color** utilities
- Add **Aspect Ratio** utilities
- Add **Backdrop Filter** utilities
- Add **Border Collapse** utilities
- Add **Border Style** utilities
- Add **Caption Side** utilities
- Add **Container** utilities
- Add **Font Style** utilities
- Add **Gap** utilities
- Add **Grid Column** utilities
- Add **Grid Row** utilities
- Add **Object Fit** utilities
- Add **Object Position** utilities
- Add **Outline Color** utilities
- Add **Outline Offset** utilities
- Add **Outline Style** utilities
- Add **Outline Width** utilities
- Add **Spacing** utilities
- Add **Table Layout** utilities
- Add **Text Decoration Color** utilities
- Add **Text Decoration Style** utilities
- Add **Text Decoration Thickness** utilities
- Add `_mixin.scss` partial
- Add `core.scss` file
- Add `functions.scss` partial
- Include **Hover** utility variants
- Include **Responsive** utility variants
- Include **Silver** color to the color palette

### Changed

- **Border Color** utilities no longer have `border-style` and `border-width` properties by default
- Base styles are now optional
- Colors now use HEX color format
- Fix `transparent` having color variants
- Fix conflict between `float: none;` (`f-none`) and `flex: none;` (`f-none`)
- New **Flex Basis** utilities - `fb-full`, `fb-half`
- New `auto` property in **Margin** and **Padding** utilities
- New `max-content` and `min-content` properties in **Grid Auto Columns**, **Grid Auto Rows**, **Height**, **Width**, **Dimension** and **Flex Basis**
- New `xxl` breakpoint utilities
- Simplify **Font Family** fallbacks
- Stylecent now covers the `<optgroup>`
- Update **Container** syntax from `cnn` to `cnt`
- Update **Float** syntax from `f-*static*` to `flo-*`
- Update **Font Family** utility syntaxes from `ff-d` to `ff-s`
- Update **Font Size** Extra large syntax from `fs-2xl` to `fs-xxl`
- Update **Position** syntax from `pos-*` to `p-*`
- Update **Position** syntax from `pos-static` to `p-s`
- Update **Position** syntax from `pos-sticky` to `p-t`
- Update `cnt` utility with new responsive utility rules
- Update property values from `0.75rem` to `0.25rem` for **Margin** and **Padding** utilities
- Update values in breakpoint utilities

### Removed

- Remove **Column** utilities
- Remove **Offset Gap** utilities
- Remove **Row** utility
- Remove `_grid.scss` partial
- Remove `badge-*` component
- Remove `btn-*` component
- Remove `btn-otl-*` component
- Remove `card-*` component
- Remove `ff-i` utility
- Remove `nav-*` component
- Remove Components folder
- Remove extra small value for breakpoint utilities

## [Unreleased]

### Added

- Add the `0` value to **Opacity** utilities.
- Add the `full` and `half` values to **Flex** utilities.

### Changed

- New `baseline` **Align Content** utility variant.
- New `baseline` **Align Items** utility variant.
- New `default`, `context-menu`, `progress`, `cell`, `vertical-text`, `alias`, `copy`, `no-drop`, `grab`, `grabbing`, `all-scroll`, `col-resize`, `row-resize`, `ne-resize`, `nw-resize`, `se-resize`, `sw-resize`, `ew-resize`, `ns-resize`, `nesw-resize`, `nwse-resize`, `zoom-in`, and `zoom-out` **Cursor** utility variants.
- New `row dense` and `dense row` **Grid Auto Flow** utility variants.
- New `table`, `inline-table` and `inline-grid` **Display** utility variants.
- New `text` and `all` **User Select** utility variants.
- Rename **Align Content** utility syntax from `ac-stretch` to `ac-s`
- Rename **Align Items** utility syntax from `ai-stretch` to `ai-s`
- Rename **Align Self** utility syntax from `as-stretch` to `as-s`
- Rename **Position** utility syntax from `p-t` to `p-st`
- Update **Border Width** classes output value sequence.
- Update **Flex** utility variants.
- Update **Outline Offset** classes output value sequence.
- Update **Outline Width** classes output value sequence.

### Removed

- Remove `end` and `start` properties from **Align Content** utilities.
- Remove `end` and `start` properties from **Align Items** utilities.
- Remove `end` and `start` properties from **Align Self** utilities.
- Remove `end`, `left`, `right` and `start` properties from **Justify Content** utilities.
- Remove `flex-end`, `flex-start`, `left`, `normal`, `right` and `stretch` properties from **Justify Items** utilities.
- Remove `flex-end`, `flex-start`, `left`, `normal`, `right` and `stretch` properties from **Justify Self** utilities.
- Remove `hidden` property in **Border Style** utilities.
- Remove `hidden` property in **Outline Offset** utilities.