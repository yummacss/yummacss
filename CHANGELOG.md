# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [3.15.0] - 2026-02-20

### Added

- **[core]** Add refined outset and inset `box-shadow` values from `xs` to `3xl`.
- **[core]** Implement `overscroll-behavior` utilities (`ob-`, `obb-`, `obi-`, `obx-`, `oby-`).
- **[core]** Implement `empty-cells` utility (`ec-s`, `ec-h`).
- **[core]** Implement `word-break` utility (`wb-`).
- **[core]** Implement `9999` `z-index` utility value.
- **[core]** Add `mix-blend-mode` utility (`mbm-`).
- **[core]** Add `backdrop-grayscale` utility (`bf-g-`).
- **[core]**, **[cli]**, **[nitro]**, **[runtime]** Implement CommonJS (CJS) support using the `default` field in `package.json`.
- **[core]** Expand viewport unit support: Add `vi`, `vb`, `svh`, `svw`, `lvh`, `lvw`, `vmin`, and `vmax` to Box Model utilities.
- **[core]**, **[nitro]** Implement Container Query variants (e.g., `@sm:w-full`) for container-based responsive design.

### Changed

- **[core]** Rename `box-shadow` prefix from `bsh-` to `bs-o-` (outset) and `bs-i-` (inset).
- **[core]** Rename border-color sub-utility prefixes for consistency (`bc-t` -> `btc`, `bc-b` -> `bbc`, `bc-l` -> `blc`, `bc-r` -> `brc`).
- **[core]** Rename border-radius sub-utility prefixes for consistency (`br-t` -> `btr`, `br-b` -> `bbr`, `br-l` -> `blr`, `br-r` -> `brr`, etc.).
- **[runtime]** Rename browser `globalName` from `YummaCSS` to `yummacss`.
- **[core]** Refactor scale utilities: move from `transform: scale()` to standalone `scale` property. New prefixes: `s-`, `sx-`, `sy-`, and `sz-`.

### Fixed

- **[cli]** Create output directory automatically if it does not exist.

### Removed

- **[core]** Remove `bsh-` (box-shadow) utilities.
- **[core]** Remove `dimension` (`d-`), `max-dimension` (`max-d-`), and `min-dimension` (`min-d-`) utilities.
- **[core]** Remove legacy transform scale prefixes: `t-s-`, `t-sx-`, `t-sy-`.

## [3.14.0] - 2026-02-10

### Removed

- **[core]**, **[nitro]**, **[cli]**, **[runtime]** Remove CommonJS (CJS) support (again) to optimize bundle size.

## [3.13.0] - 2026-02-10

### Added

- **[core]** Expose `mediaQueries`, `opacity`, `pseudoClasses`, and `pseudoElements` variants with improved type safety.
  - **Variant Literal Types:** We now export literal types for every variant prefix (e.g., `MediaQueryPrefix`, `VariantPrefix`).
  - **Readonly Interfaces:** Integrated `readonly` properties into core interfaces (`Utility`, `Utilities`, `Variants`) to support immutable variant definitions and ensure strict type compatibility with literal constants.

## [3.12.0] - 2026-02-07

### Added

- **[core]** Implement CommonJS (CJS) support.
- **[nitro]** Implement CommonJS (CJS) support.
- **[cli]** Implement CommonJS (CJS) support.
- **[runtime]** Implement CommonJS (CJS) support.

## [3.11.0] - 2026-02-05

### Added

- **[core]** Implement `tp-h` (`transition-property: height;`) utility.
- **[core]** Implement `tp-w` (`transition-property: width;`) utility.
- **[core]** Implement `tp-d` (`transition-property: height, width;`) utility.

### Changed

- **[core]** Update `margin-block` and `margin-inline` property and slug map data.
- **[core]** Update `padding-block` and `padding-inline` property and slug map data.

## [3.10.3] - 2026-02-01

No notable changes.

## [3.10.2] - 2026-02-01

### Added

- **[core]** Extend `translateX` and `translateY` utilities to 0-100 scale.
  
### Changed

- **[core]** Rename `tde-*` (`transition-delay`) utilities prefix to `td-*`.
- **[core]** Rename `td-*` (`transition-duration`) utilities prefix to `tdu-*`.
- **[core]** The `td-*` and `tdu-*` utility suffix now matches its property value for better usability.

## [3.10.1] - 2026-01-31

### Changed

- **[core]** Rename `trd-*` (`transition-delay`) utilities prefix to `tde-*`.

### Fixed

- **[core]** Transition utilities are now being generated properly.
- **[nitro]** Corrected incorrect pseudo-class/pseudo-element matching.

## [3.10.0] - 2026-01-31

### Added

- **[core]** Implement `lime`, `mint`, `sky`, `lavender`, `magenta`, `coral`, and `zinc` colors options.
- **[core]** Implement 11 new pseudo-class variants: `c:` (checked), `d:` (disabled), `e:` (empty), `fc:` (first-child), `i:` (invalid), `in:` (indeterminate), `lc:` (last-child), `nc:` (nth-child), `r:` (required), `ro:` (read-only), and `v:` (valid).
- **[core]** Implement `ro-*` (rotate) utilities as a shorthand for `t-r-*`.
- **[core]** Expand `ar-*` utilities (`aspect-ratio`).
- **[core]** Update font family variables (`fontDefault`, `fontMono`, `fontSerif`) with more modern and comprehensive stacks.
- **[core]** Implement **Transitions** category
- **[core]** Implement `tp-*` utilities (`transition-property`)
- **[core]** Implement `td-*` utilities (`transition-duration`) (steps of 50).
- **[core]** Implement `ttf-*` utilities (`transition-timing-function`)
- **[core]** Implement `trd-*` utilities (`transition-delay`) (steps of 50).

### Changed

- **[core]** Replace `t-r-*` (`transform: rotate()`) with `ro-*` utilities using the standalone `rotate` property.
- **[core]** Replace `ff-s` (System) with `ff-d` (Default).
- **[core]** Replace `ff-c` (Charters) with `ff-s` (Serif).

### Removed

- **[core]** Remove `teal` color option.

## [3.9.0] - 2026-01-24

### Added

- **[core]** Implement `a::*` pseudo-element variant (`::after`).
- **[core]** Implement `b::*` pseudo-element variant (`::before`).
- **[core]** Implement `fv:*` pseudo-class variant (`:focus-visible`).
- **[core]** Implement `fw:*` pseudo-class variant (`:focus-within`).
- **[core]** Implement `p::*` pseudo-element variant (`::placeholder`).
- **[core]** Implement `s::*` pseudo-element variant (`::selection`).
- **[core]** Implement `pc:*` media query variant for touch devices (`@media (pointer: coarse)`).
- **[core]** Implement 10 new cursor values: `alias`, `all-scroll`, `cell`, `context-menu`, `copy`, `grab`, `grabbing`, `ew-resize`, `ns-resize`, and `vertical-text`.
- **[core]** Implement `ta-*` utilities (`touch-action`) with all 10 values.
- **[core]** Implement `auto` value to `b-*` (`bottom`), `i-*` (`inset`), `ix-*` (`inset-x`), `iy-*` (`inset-y`), `l-*` (`left`), `r-*` (`right`), and `t-*` (`top`) utilities.
- **[core]** Extend `t-r-*` (`rotate`) utility range from 0-100 to 0-360 degrees (steps of 5).
- **[core]** Implement `t-tx-*` and `t-ty-*` utilities for `translateX` and `translateY` with full/half values.
- **[nitro]** Implement support for negative values using `--` syntax (e.g., `m--1` for `margin: -0.25rem`).

### Changed

- **[core]** Rename package from `@yummacss/api` to `@yummacss/core`.
- **[core]** Update `mx-*` (`margin-x`) to use `margin-inline` instead of `margin-left` and `margin-right`.
- **[core]** Update `my-*` (`margin-y`) to use `margin-block` instead of `margin-top` and `margin-bottom`.
- **[core]** Update `px-*` (`padding-x`) to use `padding-inline` instead of `padding-left` and `padding-right`.
- **[core]** Update `py-*` (`padding-y`) to use `padding-block` instead of `padding-top` and `padding-bottom`.
- **[core]** Rename `bs-*` (`box-shadow`) to `bsh-*` to resolve collision with `border-style` and `border-spacing`.
- **[core]** Rename `i-*` (`isolation`) to `is-*` to resolve collision with `inset`.

## [3.8.1] - 2026-01-16

### Fixed

- **[cli]** Restore `README.md` file.

## [3.8.0] - 2026-01-15

### Added

- **Monorepo migration**: All packages are now unified under a single repository.
  - `@yummacss/api` - The API behind Yumma CSS
  - `@yummacss/nitro` - The engine behind Yumma CSS
  - `@yummacss/runtime` - Zero-config browser runtime for Yumma CSS
  - `yummacss` - The CLI tool

### Changed

- All packages now share version `3.8.0` for consistency.
- Package repository URLs now point to the monorepo with a `directory` field.

## [3.7.2] - 2026-01-09

No notable changes.


## [3.7.1] - 2025-12-31

### Fixed

- Update `@yummacss/nitro` to `0.5.0`.

## [3.7.0] - 2025-12-31

### Added

- Implement `px` variants to all `border` and `gap` utilities.
- Implement `s` value (`stretch`) to `height`, `width` and Dimension utilities.
- Implement `ts-*` utilities (`tab-size`).
- Implement `va-*` utilities (`vertical-align`).
- Implement `wm-*` utilities (`writing-mode`).
- Extend `top`, `right`, `bottom`, `left`, `inset`, `inset-x`, `inset-y` utilities range from `16` to `100`.

### Changed

- Rename `9` to `pill` in all `border-radius` utilities.
- Rename `b-*` utilities to `bw-*` (`border-width`).
- Rename `b-*` variants (e.g., `bt`, `br`) to `bw-*` equivalents (e.g. `btw`, `brw`).
- Rename `b` utility to `bs` (`border-style`).
- Rename `bo-*` utilities to `b-*` (`bottom`).
- Rename `rad-*` utilities to `br-*` (`border-radius`).
- Rename `tc-*` utilities to `c-*` (`color`).

## [3.6.2] - 2025-12-27

No notable changes.


## [3.6.1] - 2025-12-26

### Fixed

- Use `mjs` instead of `js` for fixed exports.

## [3.6.0] - 2025-12-26

### Added

- Implement support for arbitrary, chainable variants (e.g. `lg:h:bg-red/50`).

## [3.5.0] - 2025-10-11

### Added

- Implement opacity support for all color utilities.
- Improve CSS generation architecture for better performance and maintainability.

## [3.4.3] - 2025-10-03

### Fixed

- CSS rules now sorted alphabetically for consistent output.
- Ensure that slashes are correctly escaped in utilities.

## [3.4.2] - 2025-10-03

### Fixed

- `tdt-*` utilities now use `px` instead of `rem`.

## [3.4.1] - 2025-10-02

### Fixed

- Utilities with slashes or colons not escaped properly.

## [3.4.0] - 2025-10-02

### Added

- Implement media query support for all color utilities.

### Changed

- Base styles are no longer tree-shaken.
- Improve build and rebuild times with `build` and `watch` tasks.
- Improve CSS generation architecture for better performance and maintainability.

### Fixed

- NPM users can now run the CLI.

## [3.3.2] - 2025-09-18

No notable changes.


## [3.3.1] - 2025-09-12

No notable changes.


## [3.3.0] - 2025-09-12

### Changed

- Update config file name from `yumma.config.mjs` to `yumma.config.js`.

### Fixed

- Changed `init` command to use JavaScript objects.

## [3.2.2] - 2025-09-08

### Fixed

- Remove default `font-weight` property from `ff-*` (`font-family`) utilities.

## [3.2.1] - 2025-09-03

### Added

- Implement `b` as an alias for the `build` command.
- Implement `i` as an alias for the `init` command.
- Implement `w` as an alias for the `watch` command.

### Changed

- Default `font-family` is now applied to the `html` tag instead of the `body` tag.

## [3.2.0] - 2025-08-23

### Added

- Implement `9` value to Border Radius utility.
- Implement `currentColor` to theme colors.
- Implement `dvw` values to **Dimension**, **Height**, and **Width** utilities.
- Implement `px` value to **Dimension**, **Height**, **Width**, **Padding**, and **Margin** utilities.
- Implement `sm`, `md`, `lg`, `xl`, `xxl` values to **Dimension**, **Height**, and **Width** utilities.
- Implement `vh` and `vw` values to **Dimension**, **Height**, and **Width** utilities.

### Changed

- Rename the `lead` utility color to `slate`.

## [3.1.0] - 2025-07-30

### Added

- Implement `:focus` and `:active` pseudo-class variant support.

### Changed

- Remove `yumma.css` and `yumma.min.css` distribution files.

### Fixed

- `init` command now generates the `yumma.config.js` file.

## [3.0.3] - 2025-07-22

No notable changes.


## [3.0.2] - 2025-07-20

No notable changes.


## [3.0.1] - 2025-07-17

### Changed

- Improve CLI messages for better user feedback.
- Improve CLI watch command with debouncing for better performance.

## [3.0.0] - 2025-04-14

### Added

- Implement **Background Attachment** utilities.
- Implement **Background Clip** utilities.
- Implement **Background Origin** utilities.
- Implement **Background Position** utilities.
- Implement **Background Repeat** utilities.
- Implement **Background Size** utilities.
- Implement **Blur** utilities.
- Implement **Border Spacing** utilities.
- Implement **Bottom Radius** utilities.
- Implement **Top/Right/Bottom/Left (Axis)** utilities.
- Implement **Clear** utilities.
- Implement **Field Sizing** utilities.
- Implement **Fill** utilities.
- Implement **Font Family** fallbacks.
- Implement **Grayscale** utilities.
- Implement **Isolation** utilities.
- Implement **Left Radius** utilities.
- Implement **Letter Spacing** utilities.
- Implement **List Style Position** utilities.
- Implement **Margin Block End** utilities.
- Implement **Margin Block Start** utilities.
- Implement **Margin Inline End** utilities.
- Implement **Margin Inline Start** utilities.
- Implement **Order** utilities.
- Implement **Padding Block End** utilities.
- Implement **Padding Block Start** utilities.
- Implement **Padding Inline End** utilities.
- Implement **Padding Inline Start** utilities.
- Implement **Place Content** utilities.
- Implement **Place Items** utilities.
- Implement **Place Self** utilities.
- Implement **Right Radius** utilities.
- Implement **Rotate** utilities.
- Implement **Scale** utilities.
- Implement **Scroll Behavior** utilities.
- Implement **Scroll Margin Bottom** utilities.
- Implement **Scroll Margin Inline End** utilities.
- Implement **Scroll Margin Inline Start** utilities.
- Implement **Scroll Margin Left** utilities.
- Implement **Scroll Margin Right** utilities.
- Implement **Scroll Margin Top** utilities.
- Implement **Scroll Margin X** utilities.
- Implement **Scroll Margin Y** utilities.
- Implement **Scroll Margin** utilities.
- Implement **Scroll Snap Align** utilities.
- Implement **Scroll Snap Stop** utilities.
- Implement **Scroll Snap Type** utilities.
- Implement **Skew** utilities.
- Implement **Stroke Width** utilities.
- Implement **Stroke** utilities.
- Implement **Text Indent** utilities.
- Implement **Text Overflow** utilities.
- Implement **Text Transform** utilities.
- Implement **Text Underline Offset** utilities.
- Implement **Text Wrap** utilities.
- Implement **Top Radius** utilities.
- Implement **Transform Origin** utilities.
- Implement **Visibility** utilities.
- Implement **White Space** utilities.
- Implement `1/2`, `2/1`, `2/3`, `3/2`, and `9/16` property values for **Aspect Ratio** utilities.
- Implement `column-dense` and `row-dense` property values for **Grid Auto Flow** utilities.
- Implement `fs-4xl`, `fs-5xl`, `fs-7xl` and `fs-8xl` property values for **Font Size** utilities.
- Implement `full` and `half` property values for **Top/Right/Bottom/Left** utilities.
- Implement `table-cell`, `table-column` and `table-row` property values for **Display** utilities.
- Implement CLI functionality for CSS generation.
- Expand **Column Gap** utilities from 0 to 100.
- Expand **Gap** utilities from 0 to 100.
- Expand **Row Gap** utilities from 0 to 100.

### Changed

- Base styles can no longer be referenced as a CSS file.
- Rename **Columns** utilities from `cols-*` to `c-*`.
- Rename **Dimension** utilities from `dim-*` to `d-*`.
- Rename **Dimension** utility from `d-1/1` to `d-dvh`.
- Rename **Direction Bottom** utilities from `dir-b-*` to `bo-*`.
- Rename **Direction Inset** utilities from `dir-i-*` to `i-*`.
- Rename **Direction Left** utilities from `dir-l-*` to `l-*`.
- Rename **Direction Right** utilities from `dir-r-*` to `r-*`.
- Rename **Direction Top** utilities from `dir-t-*` to `t-*`.
- Rename **Float** utilities from `flo-*` to `fl-*`.
- Rename **Font Size** utilities from `fs-b` to `fs-md`.
- Rename **Height** utility from `h-1/1` to `h-dvh`.
- Rename **Max Dimension** utilities from `max-dim-*` to `max-d-*`.
- Rename **Min Dimension** utilities from `min-dim-*` to `min-d-*`.
- Rename **Overflow X** utilities from `ovf-x-*` to `o-x-*`.
- Rename **Overflow Y** utilities from `ovf-y-*` to `o-y-*`.
- Rename **Overflow** utilities from `ovf-*` to `o-*`.
- Rename **Width** utility from `w-1/1` to `w-dvh`.
- Update **Direction** utilities to use `rem` as unit.
- Update color shade percentage from `10%` to `14%`.
- Update color utility range from 1-6 to 1-12.

### Removed

- Remove **Spacing X** utilities.
- Remove **Spacing Y** utilities.
- Remove `.cnt{}` utility.
- Remove `.ins{}` utility.
- Remove `d-` (dark) and `l-` (light) prefixes from all color utilities.
- Remove `d-` prefix from **Top/Right/Bottom/Left** utilities.
- Remove `d-1/2` **Dimension** utility variant.
- Remove `h-1/2` **Height** utility variant.
- Remove `hidden` and `none` properties from **Text Decoration Style** utilities.
- Remove `none` **Top/Right/Bottom/Left** invalid utilities.
- Remove `w-1/2` **Width** utility variant.

### Fixed

- Duplicated utilities in CSS distribution files fixed.
- Media query utilities now override as expected.

## [2.1.0] - 2024-10-11

### Added

- Implement `cursor: pointer` property value to all `<button>` elements.
- Implement `0` value to **Opacity** utility variant.
- Implement `auto` property to **Flex** utility variant.
- Implement `baseline` property values for **Align Content** utilities.
- Implement `baseline` property values for **Align Items** utilities.
- Implement `cg-0` (`column-gap`) and `rg-0` (`row-gap`) utilities.
- Implement `col-resize`, `default`, `ne-resize`, `nesw-resize`, `none`, `nw-resize`, `nwse-resize`, `progress`, `row-resize`, `s-resize`, `se-resize`, `sw-resize`, `w-resize`, `zoom-in`, `zoom-out` **Cursor** property values to **Cursor** utilities.
- Implement `f-b` (`font-size`) base utility.
- Implement `font-size: inherit` and `font-weight: inherit` properties for heading and paragraph elements.
- Implement `fs-9xl` **Font Size** utility variant.
- Implement `row dense` and `dense row` **Grid Auto Flow** property values.
- Implement `table`, `inline-table` and `inline-grid` **Display** property values.
- Implement `text` and `all` **User Select** property values.

### Changed

- Update **Border Radius** base value from `4px` to `0.25rem`.
- Update **Border Width** base value from `4px` to `1px`.
- Update **Flex Basis** base value from `1rem` to `0.25rem`.
- Update **Flex** property values.
- Update **Outline Offset** base value from `2px` to `1px`.
- Update **Outline Width** base value from `2px` to `1px`.
- Update **Spacing X** and **Spacing Y** calculations.
- Rename **Align Content** utilities from `ac-stretch` to `ac-s`.
- Rename **Align Items** utilities from `ai-stretch` to `ai-s`.
- Rename **Align Self** utilities from `as-stretch` to `as-s`.
- Rename **Justify Items** utilities from `ji-stretch` to `ji-st`.
- Rename **Justify Self** utilities from `js-stretch` to `ji-st`.
- Rename **Object Position** utilities from `op-left` to `op-l`.
- Rename **Position** utilities from `p-t` to `p-y`.
- Rename **Position** utilities from `p-y` to `p-st`.

### Removed

- Remove `end` and `start` property values from **Align Content** utilities.
- Remove `end` and `start` property values from **Align Items** utilities.
- Remove `end` and `start` property values from **Align Self** utilities.
- Remove `end`, `left`, `right` and `start` property values from **Justify Content** utilities.
- Remove `er` **Cursor** utility variant.
- Remove `flex-end`, `flex-start`, `left`, `normal` and `right` property values from **Justify Items** utilities.
- Remove `flex-end`, `flex-start`, `left`, `normal`, `right` and `stretch` property values from **Justify Self** utilities.
- Remove `hidden` property in **Border Style** utilities.
- Remove `hidden` property in **Outline Style** utilities.
- Remove variable inside **Spacing X** and **Spacing Y** utilities.

## [2.0.0] - 2024-09-08

### Added

- Implement **Accent Color** utilities.
- Implement **Aspect Ratio** utilities.
- Implement **Backdrop Filter** utilities.
- Implement **Border Collapse** utilities.
- Implement **Border Style** utilities.
- Implement **Caption Side** utilities.
- Implement **Container** utilities.
- Implement **Font Style** utilities.
- Implement **Gap** utilities.
- Implement **Grid Column** utilities.
- Implement **Grid Row** utilities.
- Implement **Object Fit** utilities.
- Implement **Object Position** utilities.
- Implement **Outline Color** utilities.
- Implement **Outline Offset** utilities.
- Implement **Outline Style** utilities.
- Implement **Outline Width** utilities.
- Implement **Silver** color to the color system.
- Implement **Spacing** utilities.
- Implement **Table Layout** utilities.
- Implement **Text Decoration Color** utilities.
- Implement **Text Decoration Style** utilities.
- Implement **Text Decoration Thickness** utilities.
- Implement `auto` property in **Margin** and **Padding** utilities.
- Implement `fb-full`, `fb-half` property values to **Flex Basis** utilities .
- Implement `max-content` and `min-content` property values for **Flex Basis** utilities.
- Implement `max-content` and `min-content` property values for **Grid Auto Columns** utilities.
- Implement `max-content` and `min-content` property values for **Grid Auto Rows** utilities.
- Implement `max-content` and `min-content` property values for **Height** utilities.
- Implement `max-content` and `min-content` property values for **Width** utilities.
- Implement `xxl` breakpoint value.
- Implement support for hover utilities.
- Implement support for media query utilities.

### Changed

- Base styles are now optional.
- Base styles now covers the `<optgroup>`.
- Breakpoint system values reworked.
- Simplify **Font Family** fallbacks.
- Update **Margin** and **Padding** property values from `0.75rem` to `0.25rem`.
- Update `cnt` utility with new responsive utility rules.
- Rename **Container** utility from `cnn` to `cnt`.
- Rename **Float** utility from `f-*static*` to `flo-*`.
- Rename **Font Family** utility from `ff-d` to `ff-s`.
- Rename **Font Size** Extra large utility from `fs-2xl` to `fs-xxl`.
- Rename **Position** utility from `pos-*` to `p-*`.
- Rename **Position** utility from `pos-static` to `p-s`.
- Rename **Position** utility from `pos-sticky` to `p-t`.

### Removed

- Remove **Column** utilities.
- Remove **Offset Gap** utilities.
- Remove **Row** utility.
- Remove `badge-*` component.
- Remove `border-style` and `border-width` property values from **Border Color** utilities.
- Remove `btn-*` component.
- Remove `btn-otl-*` component.
- Remove `card-*` component.
- Remove `ff-i` utility.
- Remove `nav-*` component.
- Remove Components folder.
- Remove extra small value for breakpoint utilities.

### Fixed

- `transparent` having color variants.
- Conflict between `f-none` (`float: none;`) utility and `f-none` (`flex: none;`) utility.

## [1.2.0] - 2024-03-22

### Added

- Implement **Line Height** utilities.
- Implement **Max Dimension** and **Min Dimension** utilities.
- Implement **Max Height** and **Min Height** utilities.
- Implement **Max Width** and **Min Width** utilities.
- Implement `auto`, `full`, and `half` property values to the **Flex** utilities.
- Implement `fit-content` property values to **Height** and **Width** utilities.
- Implement `none` property value to **Box Shadow** utilities.
- Implement `transparent` color variant to all color utilities.
- Implement Indigo color variant to all color utilities.
- Implement support for media queries for all **Dimension** utilities.
- Improve **Direction** utilities.
- Improve **Flex Shrink** utilities.
- Improve **Flex** utilities.
- Improve **Font Sizes** utilities.
- Improve **Grid Template Columns** utilities.
- Improve **Grid Template Rows** utilities.

### Changed

- Color system reworked.
- Reworked `btn-*` component size.
- Update **Border Radius** default value from `4px` to `8px`.
- Viewports units are no longer dynamic.

### Removed

- Remove `bs` base utility.
- Remove `showVer()` function.
- Remove complement button component.
- Remove default shadow in the `nav-*` component.
- Remove Magenta color from the color system.

## [1.1.0] - 2024-01-24

### Added

- Implement **Dimension** utilities.
- Implement extra small variant for font size utilities.
- Implement media query support for utilities.
- Implement transition property to button components.

### Changed

- Rename `box-shadow` utility from `bs-xlg` to `bs-xl`.
- Rename `box-shadow` utility from `bs-xsm` to `bs-xs`.
- Rename `box-shadow` utility from `col-*` to `cols-*`.
- Rename `box-shadow` utility from `fs-xlg` to `bs-xl`.
- Update syntax for column media query utilities.

### Fixed

- `caret-color` utility variants were fixed so that they work as expected.
- `fs-md` now works as expected.
- `list-style-type` syntax corrected from `tst-*` to `lst-*`.

## [1.0.3] - 2024-01-09

### Changed

- Minified CSS file moved to the `/dist` folder.

## [1.0.2] - 2024-01-05

### Fixed

- `caret-color` light and dark color utility variations addressed.
- Viewport classes now work as expected.

## [1.0.1] - 2024-01-04

### Changed

- Update **Height** and **Width** utility viewport values from dynamic to standard.

### Fixed

- Minified CSS file now works as expected.

## [1.0.0] - 2024-01-03

### Added

- Implement **Align Content** utilities.
- Implement **Align Self** utilities.
- Implement **Appearance** utilities.
- Implement **Caret Colors** utilities.
- Implement **Cursor** utilities.
- Implement **Flex Basis** utilities.
- Implement **Flex Grow** utilities.
- Implement **Font Family** utilities.
- Implement **Grid Auto Columns** utilities.
- Implement **Grid Auto Flow** utilities.
- Implement **Grid Auto Rows** utilities.
- Implement **Justify Items** utilities.
- Implement **Justify Self** utilities.
- Implement **List Style Type** utilities.
- Implement **Pointer Events** utilities.
- Implement **Text Decoration** utilities.
- Implement **User Select** utilities.
- Implement `end`, `flex-start`, `flex-end`, `left`, `right`, `normal` and `stretch` property values to **Justify Content** utilities.
- Implement `flex-start` and `flex-end` property values to **Align Items** utilities.
- Implement `flow-root` property value to **Display** utilities.
- Implement `inline-start` and `inline-end` property values to **Float** utilities.
- Implement `justify-all` and `match-parent` property values to **Text Align** utilities.
- Implement `mx-*` and `my-*` **Margin** utilities.
- Implement `overline` property to **Text Decoration Line** utilities.
- Implement `px-*` and `py-*` **Padding** utilities.
- Implement Lead color utility to the color system.
- Implement viewport values for **Height** and **Width** utilities.

### Changed

- Rename **Display** utilities from `dis-*` to `d-*`.
- Rename `greet()` function signature to `showVer()`.
- Rename hover variant utilities from `*-h-*` to `h:*`.

### Removed

- Remove `break-all` and `keep-all` property values from **Overflow Wrap** utilities.
- Remove `nav-l` component.

### Fixed

- Small CSS resetting improvements.
- Remove duplicated **Justify Content** utilities.

## [0.2.0] - 2023-11-23

No notable changes.

## [0.1.1] - 2023-11-07

No notable changes.

## [0.1.0] - 2023-11-06

### Added

- Expand **Height** utilities from 0 to 100.
- Expand **Margin** utilities from 0 to 100.
- Expand **Padding** utilities from 0 to 100.
- Expand **Width** utilities from 0 to 100.

## [0.0.1] - 2023-10-02

### Added

- Initial release.

[Unreleased]: https://github.com/yummacss/yummacss/compare/v3.15.0...HEAD
[3.15.0]: https://github.com/yummacss/yummacss/compare/v3.14.0...v3.15.0
[3.14.0]: https://github.com/yummacss/yummacss/compare/v3.13.0...v3.14.0
[3.13.0]: https://github.com/yummacss/yummacss/compare/v3.12.0...v3.13.0
[3.12.0]: https://github.com/yummacss/yummacss/compare/v3.11.0...v3.12.0
[3.11.0]: https://github.com/yummacss/yummacss/compare/v3.10.3...v3.11.0
[3.10.3]: https://github.com/yummacss/yummacss/compare/v3.10.2...v3.10.3
[3.10.2]: https://github.com/yummacss/yummacss/compare/v3.10.1...v3.10.2
[3.10.1]: https://github.com/yummacss/yummacss/compare/v3.10.0...v3.10.1
[3.10.0]: https://github.com/yummacss/yummacss/compare/v3.9.0...v3.10.0
[3.9.0]: https://github.com/yummacss/yummacss/compare/v3.8.1...v3.9.0
[3.8.1]: https://github.com/yummacss/yummacss/compare/v3.8.0...v3.8.1
[3.8.0]: https://github.com/yummacss/yummacss/compare/v3.7.2...v3.8.0
[3.7.2]: https://github.com/yummacss/yummacss/compare/v3.7.1...v3.7.2
[3.7.1]: https://github.com/yummacss/yummacss/compare/v3.7.0...v3.7.1
[3.7.0]: https://github.com/yummacss/yummacss/compare/v3.6.2...v3.7.0
[3.6.2]: https://github.com/yummacss/yummacss/compare/v3.6.1...v3.6.2
[3.6.1]: https://github.com/yummacss/yummacss/compare/v3.6.0...v3.6.1
[3.6.0]: https://github.com/yummacss/yummacss/compare/v3.5.0...v3.6.0
[3.5.0]: https://github.com/yummacss/yummacss/compare/v3.4.3...v3.5.0
[3.4.3]: https://github.com/yummacss/yummacss/compare/v3.4.2...v3.4.3
[3.4.2]: https://github.com/yummacss/yummacss/compare/v3.4.1...v3.4.2
[3.4.1]: https://github.com/yummacss/yummacss/compare/v3.4.0...v3.4.1
[3.4.0]: https://github.com/yummacss/yummacss/compare/v3.3.2...v3.4.0
[3.3.2]: https://github.com/yummacss/yummacss/compare/v3.3.1...v3.3.2
[3.3.1]: https://github.com/yummacss/yummacss/compare/v3.3.0...v3.3.1
[3.3.0]: https://github.com/yummacss/yummacss/compare/v3.2.2...v3.3.0
[3.2.2]: https://github.com/yummacss/yummacss/compare/v3.2.1...v3.2.2
[3.2.1]: https://github.com/yummacss/yummacss/compare/v3.2.0...v3.2.1
[3.2.0]: https://github.com/yummacss/yummacss/compare/v3.1.0...v3.2.0
[3.1.0]: https://github.com/yummacss/yummacss/compare/v3.0.3...v3.1.0
[3.0.3]: https://github.com/yummacss/yummacss/compare/v3.0.2...v3.0.3
[3.0.2]: https://github.com/yummacss/yummacss/compare/v3.0.1...v3.0.2
[3.0.1]: https://github.com/yummacss/yummacss/compare/v3.0.0...v3.0.1
[3.0.0]: https://github.com/yummacss/yummacss/compare/v2.1.0...v3.0.0
[2.1.0]: https://github.com/yummacss/yummacss/compare/v2.0.0...v2.1.0
[2.0.0]: https://github.com/yummacss/yummacss/compare/v1.2.0...v2.0.0
[1.2.0]: https://github.com/yummacss/yummacss/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/yummacss/yummacss/compare/v1.0.3...v1.1.0
[1.0.3]: https://github.com/yummacss/yummacss/compare/v1.0.2...v1.0.3
[1.0.2]: https://github.com/yummacss/yummacss/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/yummacss/yummacss/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/yummacss/yummacss/compare/v0.2.0...v1.0.0
[0.2.0]: https://github.com/yummacss/yummacss/compare/v0.1.1...v0.2.0
[0.1.1]: https://github.com/yummacss/yummacss/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/yummacss/yummacss/compare/v0.0.1...v0.1.0
[0.0.1]: https://github.com/yummacss/yummacss/releases/tag/v0.0.1
