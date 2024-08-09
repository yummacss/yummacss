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