# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.10.2] - 2026-01-31

## Breaking Changes

- **[core]** Renamed `tde-*` (`transition-delay`) utilities prefix to `td-*`.
- **[core]** Renamed `td-*` (`transition-duration`) utilities prefix to `tdu-*`.
- **[core]** The `td-*` and `tdu-*` utility suffix now matches its property value for better usability.
- **[core]** Extended `translateX` and `translateY` utilities to 0-100 scale.

## [3.10.1] - 2026-01-31

## Breaking Changes

- **[core]** Renamed `trd-*` (`transition-delay`) utilities prefix to `tde-*`.

### Fixes

- **[core]** Fixed transition utilities not being generated.
- **[nitro]** Fixed a bug in the generator where pseudo-class prefixes incorrectly matched pseudo-element separators.

## [3.10.0] - 2026-01-31

### Features

- **[core]** Added `lime`, `mint`, `sky`, `lavender`, `magenta`, `coral`, and `zinc` colors options.
- **[core]** Added 11 new pseudo-class variants: `c:` (checked), `d:` (disabled), `e:` (empty), `fc:` (first-child), `i:` (invalid), `in:` (indeterminate), `lc:` (last-child), `nc:` (nth-child), `r:` (required), `ro:` (read-only), and `v:` (valid).
- **[core]** Added `ro-*` (rotate) utilities as a shorthand for `t-r-*`.
- **[core]** Expanded `ar-*` utilities (`aspect-ratio`).
- **[core]** Updated font family variables (`fontDefault`, `fontMono`, `fontSerif`) with more modern and comprehensive stacks.
- **[core]** Introduced **Transitions** category
- **[core]** Added `tp-*` utilities (`transition-property`)
- **[core]** Added `td-*` utilities (`transition-duration`) (steps of 50).
- **[core]** Added `ttf-*` utilities (`transition-timing-function`)
- **[core]** Added `trd-*` utilities (`transition-delay`) (steps of 50).

### Breaking changes

- **[core]** Removed `teal` color option.
- **[core]** Replaced `t-r-*` (`transform: rotate()`) with `ro-*` utilities using the standalone `rotate` property.
- **[core]** Replaced `ff-s` (System) with `ff-d` (Default).
- **[core]** Replaced `ff-c` (Charters) with `ff-s` (Serif).

## [3.9.0] - 2026-01-24

### Features

- **[core]** Added `a::*` pseudo-element variant (`::after`).
- **[core]** Added `b::*` pseudo-element variant (`::before`).
- **[core]** Added `fv:*` pseudo-class variant (`:focus-visible`).
- **[core]** Added `fw:*` pseudo-class variant (`:focus-within`).
- **[core]** Added `p::*` pseudo-element variant (`::placeholder`).
- **[core]** Added `s::*` pseudo-element variant (`::selection`).
- **[core]** Added `pc:*` media query variant for touch devices (`@media (pointer: coarse)`).
- **[core]** Added 10 new cursor values: `alias`, `all-scroll`, `cell`, `context-menu`, `copy`, `grab`, `grabbing`, `ew-resize`, `ns-resize`, and `vertical-text`.
- **[core]** Added `ta-*` utilities (`touch-action`) with all 10 values.
- **[core]** Added `auto` value to `b-*` (`bottom`), `i-*` (`inset`), `ix-*` (`inset-x`), `iy-*` (`inset-y`), `l-*` (`left`), `r-*` (`right`), and `t-*` (`top`) utilities.
- **[core]** Extended `t-r-*` (`rotate`) utility range from 0-100 to 0-360 degrees (steps of 5).
- **[core]** Added `t-tx-*` and `t-ty-*` utilities for `translateX` and `translateY` with full/half values.
- **[nitro]** Added support for negative values using `--` syntax (e.g., `m--1` for `margin: -0.25rem`).

### Breaking changes

- **[core]** Renamed package from `@yummacss/api` to `@yummacss/core`.
- **[core]** Updated `mx-*` (`margin-x`) to use `margin-inline` instead of `margin-left` and `margin-right`.
- **[core]** Updated `my-*` (`margin-y`) to use `margin-block` instead of `margin-top` and `margin-bottom`.
- **[core]** Updated `px-*` (`padding-x`) to use `padding-inline` instead of `padding-left` and `padding-right`.
- **[core]** Updated `py-*` (`padding-y`) to use `padding-block` instead of `padding-top` and `padding-bottom`.
- **[core]** Renamed `bs-*` (`box-shadow`) to `bsh-*` to resolve collision with `border-style` and `border-spacing`.
- **[core]** Renamed `i-*` (`isolation`) to `is-*` to resolve collision with `inset`.

## [3.8.1] - 2026-01-16

### Fixes

- **[cli]** Restored `README.md` file.

## [3.8.0] - 2026-01-15

### Features

- **Monorepo migration**: All packages are now unified under a single repository.
  - `@yummacss/api` - The API behind Yumma CSS
  - `@yummacss/nitro` - The engine behind Yumma CSS
  - `@yummacss/runtime` - Zero-config browser runtime for Yumma CSS
  - `yummacss` - The CLI tool

### Breaking changes

- All packages now share version `3.8.0` for consistency.
- Package repository URLs now point to the monorepo with a `directory` field.

## [3.7.2] - 2026-01-09

### Features

- No user-facing changes.

## [3.7.1] - 2025-12-31

### Fixes

- Update `@yummacss/nitro` to `0.5.0`.

## [3.7.0] - 2025-12-31

### Features

- Added `px` variants to all `border` and `gap` utilities.
- Added `s` value (`stretch`) to `height`, `width` and Dimension utilities.
- Added `ts-*` utilities (`tab-size`).
- Added `va-*` utilities (`vertical-align`).
- Added `wm-*` utilities (`writing-mode`).
- Extended `top`, `right`, `bottom`, `left`, `inset`, `inset-x`, `inset-y` utilities range from `16` to `100`.

### Breaking changes

- Renamed `9` to `pill` in all `border-radius` utilities.
- Renamed `b-*` utilities to `bw-*` (`border-width`).
- Renamed `b-*` variants (e.g., `bt`, `br`) to `bw-*` equivalents (e.g. `btw`, `brw`).
- Renamed `b` utility to `bs` (`border-style`).
- Renamed `bo-*` utilities to `b-*` (`bottom`).
- Renamed `rad-*` utilities to `br-*` (`border-radius`).
- Renamed `tc-*` utilities to `c-*` (`color`).

## [3.6.2] - 2025-12-27

### Features

- No user-facing changes.

## [3.6.1] - 2025-12-26

### Fixes

- Fixed exports to use `mjs` instead of `js`.

## [3.6.0] - 2025-12-26

### Features

- Add support for arbitrary, chainable variants (e.g. `lg:h:bg-red/50`).

## [3.5.0] - 2025-10-11

### Features

- Added opacity support for all color utilities.
- Improved CSS generation architecture for better performance and maintainability.

## [3.4.3] - 2025-10-03

### Fixes

- Fixed CSS rules to be sorted alphabetically for consistent output.
- Fixed escaping of slashes in utilities like `ar-*` (`aspect-ratio`).

## [3.4.2] - 2025-10-03

### Fixes

- Fixed `tdt-*` (text-decoration-thickness) utilities to use `px` instead of `rem`.

## [3.4.1] - 2025-10-02

### Fixes

- Fixed utilities containing slashes or colons not being properly escaped.

## [3.4.0] - 2025-10-02

### Features

- Added media query support for all color utilities.
- Improved build and rebuild times with `build` and `watch` tasks.
- Improved CSS generation architecture for better performance and maintainability.

### Breaking changes

- Base styles are no longer tree-shaken.

### Fixes

- Fixed NPM users not being able to run the CLI.

## [3.3.2] - 2025-09-18

### Features

- No user-facing changes.

## [3.3.1] - 2025-09-12

### Features

- No user-facing changes.

## [3.3.0] - 2025-09-12

### Breaking changes

- Updated config file name from `yumma.config.mjs` to `yumma.config.js`.

### Fixes

- Fixed `init` command to use JavaScript objects instead of JSON entries.

## [3.2.2] - 2025-09-08

### Fixes

- Removed default `font-weight` property from `ff-*` (`font-family`) utilities.

## [3.2.1] - 2025-09-03

### Features

- Added `b` as an alias for the `build` command.
- Added `i` as an alias for the `init` command.
- Added `w` as an alias for the `watch` command.

### Breaking changes

- Default `font-family` is now applied to the `html` tag instead of the `body` tag.

## [3.2.0] - 2025-08-23

### Features

- Added `9` value to Border Radius utility.
- Added `currentColor` to theme colors.
- Added `dvw` values to **Dimension**, **Height**, and **Width** utilities.
- Added `px` value to **Dimension**, **Height**, **Width**, **Padding**, and **Margin** utilities.
- Added `sm`, `md`, `lg`, `xl`, `xxl` values to **Dimension**, **Height**, and **Width** utilities.
- Added `vh` and `vw` values to **Dimension**, **Height**, and **Width** utilities.

### Breaking changes

- Renamed the `lead` utility color to `slate`.

## [3.1.0] - 2025-07-30

### Features

- Added `:focus` and `:active` pseudo-class variant support.

### Breaking changes

- Removed `yumma.css` and `yumma.min.css` distribution files.

### Fixes

- Fixed `init` command not generating `yumma.config.js` file.

## [3.0.3] - 2025-07-22

### Features

- No user-facing changes.

## [3.0.2] - 2025-07-20

### Features

- No user-facing changes.

## [3.0.1] - 2025-07-17

### Fixes

- Excluded CSS build artifacts from the published package.
- Improved CLI messages for better user feedback.
- Improved CLI watch command with debouncing for better performance.

## [3.0.0] - 2025-04-14

### Features

- Added **Background Attachment** utilities.
- Added **Background Clip** utilities.
- Added **Background Origin** utilities.
- Added **Background Position** utilities.
- Added **Background Repeat** utilities.
- Added **Background Size** utilities.
- Added **Blur** utilities.
- Added **Border Spacing** utilities.
- Added **Bottom Radius** utilities.
- Added **Top/Right/Bottom/Left (Axis)** utilities.
- Added **Clear** utilities.
- Added **Field Sizing** utilities.
- Added **Fill** utilities.
- Added **Font Family** fallbacks.
- Added **Grayscale** utilities.
- Added **Isolation** utilities.
- Added **Left Radius** utilities.
- Added **Letter Spacing** utilities.
- Added **List Style Position** utilities.
- Added **Margin Block End** utilities.
- Added **Margin Block Start** utilities.
- Added **Margin Inline End** utilities.
- Added **Margin Inline Start** utilities.
- Added **Order** utilities.
- Added **Padding Block End** utilities.
- Added **Padding Block Start** utilities.
- Added **Padding Inline End** utilities.
- Added **Padding Inline Start** utilities.
- Added **Place Content** utilities.
- Added **Place Items** utilities.
- Added **Place Self** utilities.
- Added **Right Radius** utilities.
- Added **Rotate** utilities.
- Added **Scale** utilities.
- Added **Scroll Behavior** utilities.
- Added **Scroll Margin Bottom** utilities.
- Added **Scroll Margin Inline End** utilities.
- Added **Scroll Margin Inline Start** utilities.
- Added **Scroll Margin Left** utilities.
- Added **Scroll Margin Right** utilities.
- Added **Scroll Margin Top** utilities.
- Added **Scroll Margin X** utilities.
- Added **Scroll Margin Y** utilities.
- Added **Scroll Margin** utilities.
- Added **Scroll Snap Align** utilities.
- Added **Scroll Snap Stop** utilities.
- Added **Scroll Snap Type** utilities.
- Added **Skew** utilities.
- Added **Stroke Width** utilities.
- Added **Stroke** utilities.
- Added **Text Indent** utilities.
- Added **Text Overflow** utilities.
- Added **Text Transform** utilities.
- Added **Text Underline Offset** utilities.
- Added **Text Wrap** utilities.
- Added **Top Radius** utilities.
- Added **Transform Origin** utilities.
- Added **Visibility** utilities.
- Added **White Space** utilities.
- Added `1/2`, `2/1`, `2/3`, `3/2`, and `9/16` property values for **Aspect Ratio** utilities.
- Added `column-dense` and `row-dense` property values for **Grid Auto Flow** utilities.
- Added `fs-4xl`, `fs-5xl`, `fs-7xl` and `fs-8xl` property values for **Font Size** utilities.
- Added `full` and `half` property values for **Top/Right/Bottom/Left** utilities.
- Added `table-cell`, `table-column` and `table-row` property values for **Display** utilities.
- Added CLI functionality for CSS generation.
- Expanded **Column Gap** utilities from 0 to 100.
- Expanded **Gap** utilities from 0 to 100.
- Expanded **Row Gap** utilities from 0 to 100.

### Breaking changes

- Base styles can no longer be referenced as a CSS file.
- Removed **Spacing X** utilities.
- Removed **Spacing Y** utilities.
- Removed `.cnt{}` utility.
- Removed `.ins{}` utility.
- Removed `d-` (dark) and `l-` (light) prefixes from all color utilities.
- Removed `d-` prefix from **Top/Right/Bottom/Left** utilities.
- Removed `d-1/2` **Dimension** utility variant.
- Removed `h-1/2` **Height** utility variant.
- Removed `hidden` and `none` properties from **Text Decoration Style** utilities.
- Removed `none` **Top/Right/Bottom/Left** invalid utilities.
- Removed `w-1/2` **Width** utility variant.
- Renamed **Columns** utilities from `cols-*` to `c-*`.
- Renamed **Dimension** utilities from `dim-*` to `d-*`.
- Renamed **Dimension** utility from `d-1/1` to `d-dvh`.
- Renamed **Direction Bottom** utilities from `dir-b-*` to `bo-*`.
- Renamed **Direction Inset** utilities from `dir-i-*` to `i-*`.
- Renamed **Direction Left** utilities from `dir-l-*` to `l-*`.
- Renamed **Direction Right** utilities from `dir-r-*` to `r-*`.
- Renamed **Direction Top** utilities from `dir-t-*` to `t-*`.
- Renamed **Float** utilities from `flo-*` to `fl-*`.
- Renamed **Font Size** utilities from `fs-b` to `fs-md`.
- Renamed **Height** utility from `h-1/1` to `h-dvh`.
- Renamed **Max Dimension** utilities from `max-dim-*` to `max-d-*`.
- Renamed **Min Dimension** utilities from `min-dim-*` to `min-d-*`.
- Renamed **Overflow X** utilities from `ovf-x-*` to `o-x-*`.
- Renamed **Overflow Y** utilities from `ovf-y-*` to `o-y-*`.
- Renamed **Overflow** utilities from `ovf-*` to `o-*`.
- Renamed **Width** utility from `w-1/1` to `w-dvh`.
- Updated **Direction** utilities to use `rem` as unit.
- Updated color shade percentage from `10%` to `14%`.
- Updated color utility range from 1-6 to 1-12.

### Fixes

- Fixed duplicated utilities in CSS distribution files.
- Fixed media query utilities not overriding as expected.

## [2.1.0] - 2024-10-11

### Features

- Add `cursor: pointer` property value to all `<button>` elements.
- Add the `0` value to **Opacity** utility variant.
- Add the `auto` property to **Flex** utility variant.

### Breaking changes

- Added `baseline` property values for **Align Content** utilities.
- Added `baseline` property values for **Align Items** utilities.
- Added `cg-0` (`column-gap`) and `rg-0` (`row-gap`) utilities.
- Added `col-resize`, `default`, `ne-resize`, `nesw-resize`, `none`, `nw-resize`, `nwse-resize`, `progress`, `row-resize`, `s-resize`, `se-resize`, `sw-resize`, .`w-resize`, `zoom-in`, `zoom-out` **Cursor** property values to **Cursor** utilities.
- Added `f-b` (`font-size`) base utility.
- Added `font-size: inherit` and `font-weight: inherit` properties for heading and paragraph elements..
- Added `fs-9xl` **Font Size** utility variant.
- Added `row dense` and `dense row` **Grid Auto Flow** property values.
- Added `table`, `inline-table` and `inline-grid` **Display** property values.
- Added `text` and `all` **User Select** property values.
- Removed `end` and `start` property values from **Align Content** utilities.
- Removed `end` and `start` property values from **Align Items** utilities.
- Removed `end` and `start` property values from **Align Self** utilities.
- Removed `end`, `left`, `right` and `start` property values from **Justify Content** utilities.
- Removed `er` **Cursor** utility variant.
- Removed `flex-end`, `flex-start`, `left`, `normal` and `right` property values from **Justify Items** utilities.
- Removed `flex-end`, `flex-start`, `left`, `normal`, `right` and `stretch` property values from **Justify Self** utilities.
- Removed `hidden` property in **Border Style** utilities.
- Removed `hidden` property in **Outline Style** utilities.
- Removed variable inside **Spacing X** and **Spacing Y** utilities.
- Renamed **Align Content** utilities from `ac-stretch` to `ac-s`.
- Renamed **Align Items** utilities from `ai-stretch` to `ai-s`.
- Renamed **Align Self** utilities from `as-stretch` to `as-s`.
- Renamed **Justify Items** utilities from `ji-stretch` to `ji-st`.
- Renamed **Justify Self** utilities from `js-stretch` to `ji-st`.
- Renamed **Object Position** utilities from `op-left` to `op-l`.
- Renamed **Position** utilities from `p-t` to `p-y`.
- Renamed **Position** utilities from `p-y` to `p-st`.
- Updated **Border Radius** base value from `4px` to `0.25rem`.
- Updated **Border Width** base value from `4px` to `1px`.
- Updated **Flex Basis** base value from `1rem` to `0.25rem`.
- Updated **Flex** property values.
- Updated **Outline Offset** base value from `2px` to `1px`.
- Updated **Outline Width** base value from `2px` to `1px`.
- Updated **Spacing X** and **Spacing Y** calculations.

## [2.0.0] - 2024-09-08

### Features

- Add **Accent Color** utilities.
- Add **Aspect Ratio** utilities.
- Add **Backdrop Filter** utilities.
- Add **Border Collapse** utilities.
- Add **Border Style** utilities.
- Add **Caption Side** utilities.
- Add **Container** utilities.
- Add **Font Style** utilities.
- Add **Gap** utilities.
- Add **Grid Column** utilities.
- Add **Grid Row** utilities.
- Add **Object Fit** utilities.
- Add **Object Position** utilities.
- Add **Outline Color** utilities.
- Add **Outline Offset** utilities.
- Add **Outline Style** utilities.
- Add **Outline Width** utilities.
- Add **Silver** color to the color system.
- Add **Spacing** utilities.
- Add **Table Layout** utilities.
- Add **Text Decoration Color** utilities.
- Add **Text Decoration Style** utilities.
- Add **Text Decoration Thickness** utilities.
- Add `auto` property in **Margin** and **Padding** utilities.
- Add `fb-full`, `fb-half` property values to **Flex Basis** utilities .
- Add `max-content` and `min-content` property values for **Flex Basis** utilities.
- Add `max-content` and `min-content` property values for **Grid Auto Columns** utilities.
- Add `max-content` and `min-content` property values for **Grid Auto Rows** utilities.
- Add `max-content` and `min-content` property values for **Height** utilities.
- Add `max-content` and `min-content` property values for **Width** utilities.
- Add `xxl` breakpoint value.
- Add support for hover utilities.
- Add support for media query utilities.

### Breaking changes

- Base styles are now optional.
- Base styles now covers the `<optgroup>`.
- Breakpoint system values reworked.
- Removed **Column** utilities.
- Removed **Offset Gap** utilities.
- Removed **Row** utility.
- Removed `badge-*` component.
- Removed `border-style` and `border-width` property values from **Border Color** utilities.
- Removed `btn-*` component.
- Removed `btn-otl-*` component.
- Removed `card-*` component.
- Removed `ff-i` utility.
- Removed `nav-*` component.
- Removed Components folder.
- Removed extra small value for breakpoint utilities.
- Renamed **Container** utility from `cnn` to `cnt`.
- Renamed **Float** utility from `f-*static*` to `flo-*`.
- Renamed **Font Family** utility from `ff-d` to `ff-s`.
- Renamed **Font Size** Extra large utility from `fs-2xl` to `fs-xxl`.
- Renamed **Position** utility from `pos-*` to `p-*`.
- Renamed **Position** utility from `pos-static` to `p-s`.
- Renamed **Position** utility from `pos-sticky` to `p-t`.
- Simplify **Font Family** fallbacks.
- Updated **Margin** and **Padding** property values from `0.75rem` to `0.25rem`.
- Updated `cnt` utility with new responsive utility rules.

### Fixes

- Fix `transparent` having color variants.
- Fix conflict between `f-none` (`float: none;`) utility and `f-none` (`flex: none;`) utility.

## [1.2.0] - 2024-03-22

### Features

- Added **Line Height** utilities.
- Added **Max Dimension** and **Min Dimension** utilities.
- Added **Max Height** and **Min Height** utilities.
- Added **Max Width** and **Min Width** utilities.
- Added `auto`, `full`, and `half` property values to the **Flex** utilities.
- Added `fit-content` property values to **Height** and **Width** utilities.
- Added `none` property value to **Box Shadow** utilities.
- Added `transparent` color variant to all color utilities.
- Added Indigo color variant to all color utilities.
- Added support for media queries for all **Dimension** utilities.
- Improved **Direction** utilities.
- Improved **Flex Shrink** utilities.
- Improved **Flex** utilities.
- Improved **Font Sizes** utilities.
- Improved **Grid Template Columns** utilities.
- Improved **Grid Template Rows** utilities.

### Breaking changes

- Color system reworked.
- Removed `bs` base utility.
- Removed `showVer()` function.
- Removed complement button component.
- Removed default shadow in the `nav-*` component.
- Removed Magenta color from the color system.
- Reworked `btn-*` component size.
- Update **Border Radius** default value from `4px` to `8px`.
- Viewports units are no longer dynamic.

## [1.1.0] - 2024-01-24

### Features

- Added **Dimension** utilities.
- Added extra small variant for font size utilities.
- Added media query support for utilities.
- Added transition property to button components.

### Breaking changes

- Renamed `box-shadow` utility from `bs-xlg` to `bs-xl`.
- Renamed `box-shadow` utility from `bs-xsm` to `bs-xs`
- Renamed `box-shadow` utility from `col-*` to `cols-*`.
- Renamed `box-shadow` utility from `fs-xlg` to `bs-xl`.
- Updated syntax for column media query utilities.

### Fixes

- Fixed `caret-color` utility variants not working as expected.
- Fixed `fs-md` not working as expected.
- Fixed `list-style-type` syntax from `tst-*` to `lst-*`.

## [1.0.3] - 2024-01-09

### Breaking changes

- Minified CSS file moved to the `/dist` folder.

## [1.0.2] - 2024-01-05

### Fixes

- Fixed `caret-color` light and dark color utilities variations.
- Fixed viewport classes not working as expected.
- Small base style improvements.

## [1.0.1] - 2024-01-04

### Breaking changes

- Updated **Height** and **Width** utility viewport values from dynamic to standard.

### Fixes

- Fixed minified CSS file.

## [1.0.0] - 2024-01-03

### Features

- Added **Align Content** utilities.
- Added **Align Self** utilities.
- Added **Appearance** utilities.
- Added **Caret Colors** utilities.
- Added **Cursor** utilities.
- Added **Flex Basis** utilities.
- Added **Flex Grow** utilities.
- Added **Font Family** utilities.
- Added **Grid Auto Columns** utilities.
- Added **Grid Auto Flow** utilities.
- Added **Grid Auto Rows** utilities.
- Added **Justify Items** utilities.
- Added **Justify Self** utilities.
- Added **List Style Type** utilities.
- Added **Pointer Events** utilities.
- Added **Text Decoration** utilities.
- Added **User Select** utilities.
- Added `end`, `flex-start`, `flex-end`, `left`, `right`, `normal` and `stretch` property values to **Justify Content** utilities.
- Added `flex-start` and `flex-end` property values to **Align Items** utilities.
- Added `flow-root` property value to **Display** utilities.
- Added `inline-start` and `inline-end` property values to **Float** utilities.
- Added `justify-all` and `match-parent` property values to **Text Align** utilities.
- Added `mx-*` and `my-*` **Margin** utilities.
- Added `overline` property to **Text Decoration Line** utilities.
- Added `px-*` and `py-*` **Padding** utilities.
- Added Lead color utility to the color system.
- Added viewport values for **Height** and **Width** utilities.

### Breaking changes

- Removed `break-all` and `keep-all` property values from **Overflow Wrap** utilities.
- Removed `nav-l` component.
- Renamed **Display** utilities from `dis-*` to `d-*`.
- Renamed `greet()` function signature to `showVer()`.
- Renamed hover variant utilities from `*-h-*` to `h:*`.

### Fixes

- Small CSS resetting improvements.
- Removed duplicated **Justify Content** utilities.

## [0.2.0] - 2023-11-23

### Features

- No user-facing changes.

## [0.1.1] - 2023-11-07

### Features

- No user-facing changes.

## [0.1.0] - 2023-11-06

### Features

- Expanded **Height** utilities from 0 to 100.
- Expanded **Margin** utilities from 0 to 100.
- Expanded **Padding** utilities from 0 to 100.
- Expanded **Width** utilities from 0 to 100.

## [0.0.1] - 2023-10-02

### Features

- Initial release.