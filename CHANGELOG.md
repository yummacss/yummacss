# Changelog

All notable changes to the Yumma CSS will be documented in this file.

## Changelog for 3.0.0 🎉

<details open>
<summary>
    <b>Features</b>
</summary>

- Added **Background Attachment** utilities
- Added **Background Clip** utilities
- Added **Background Origin** utilities
- Added **Background Position** utilities
- Added **Background Repeat** utilities
- Added **Background Size** utilities
- Added **Blur** utilities
- Added **Border Spacing** utilities
- Added **Bottom Radius** utilities
- Added **Bottom/Left/Right/Top (Axis)** utilities
- Added **Clear** utilities
- Added **Field Sizing** utilities
- Added **Fill** utilities
- Added **Font Family** fallbacks
- Added **Grayscale** utilities
- Added **Isolation** utilities
- Added **Left Radius** utilities
- Added **Letter Spacing** utilities
- Added **List Style Position** utilities
- Added **Margin Block End** utilities
- Added **Margin Block Start** utilities
- Added **Margin Inline End** utilities
- Added **Margin Inline Start** utilities
- Added **Order** utilities
- Added **Padding Block End** utilities
- Added **Padding Block Start** utilities
- Added **Padding Inline End** utilities
- Added **Padding Inline Start** utilities
- Added **Place Content** utilities
- Added **Place Items** utilities
- Added **Place Self** utilities
- Added **Right Radius** utilities
- Added **Rotate** utilities
- Added **Scale** utilities
- Added **Scroll Behavior** utilities
- Added **Scroll Margin Bottom** utilities
- Added **Scroll Margin Inline End** utilities
- Added **Scroll Margin Inline Start** utilities
- Added **Scroll Margin Left** utilities
- Added **Scroll Margin Right** utilities
- Added **Scroll Margin Top** utilities
- Added **Scroll Margin X** utilities
- Added **Scroll Margin Y** utilities
- Added **Scroll Margin** utilities
- Added **Scroll Snap Align** utilities
- Added **Scroll Snap Stop** utilities
- Added **Scroll Snap Type** utilities
- Added **Skew** utilities
- Added **Stroke Width** utilities
- Added **Stroke** utilities
- Added **Text Indent** utilities
- Added **Text Overflow** utilities
- Added **Text Transform** utilities
- Added **Text Underline Offset** utilities
- Added **Text Wrap** utilities
- Added **Top Radius** utilities
- Added **Transform Origin** utilities
- Added **Visibility** utilities
- Added **White Space** utilities
- Added `_create-colors.scss`, `_create-values.scss`, `_create-utilities.scss` and `_extend-utilities.scss` partial files
- Added `_dimension.scss`, `_height.scss`, `_margin.scss`, `_padding.scss` and `_width.scss` files
- Added `_index.scss` files
- Added `$yma-box-shadow-*` variables
- Added `$yma-font-size-*` variables
- Added `1/2`, `2/1`, `2/3`, `3/2`, and `9/16` values for **Aspect Ratio** utilities
- Added `fs-4xl`, `fs-5xl`, `fs-7xl` and `fs-8xl` values for **Font Size** utilities
- Added `full` and `half` values for **Bottom/Left/Right/Top** utilities
- Added `src/abstracts/functions` folder
- Added `table-cell`, `table-column` and `table-row` values for **Display** utilities
- Added `utilities/maps` folder
- Added `yummacss-core.scss` file
- Added the `column-dense` and `row-dense` values for **Grid Auto Flow**
- Extend **Column Gap** utilities from 0-16 to 0-100
- Extend **Gap** utilities from 0-16 to 0-100
- Extend **Row Gap** utilities from 0-16 to 0-100
- Implement Yumma CSS CLI

</details>

<details>

<summary>
    <b>Breaking changes</b>
</summary>

- Improved **Font Size** utilities
- Merged **Filters** and **Effects** subcategories into a **Effect** category
- Migrated base styles functionality to config file
- Migrated from `@import` to `@use` and `@forwards`
- Migrated from Common Js to ESM
- Migrated to Dart SCSS
- Relocate `_base.scss` to `reset/_stylecent.scss`
- Relocate `_functions.scss` to `reset/_ignore-neutral.scss`
- Removed **Spacing X** utilities
- Removed **Spacing Y** utilities
- Removed `.cnt{}` utility class
- Removed `.ins{}` utility class
- Removed `coreFile()` function from `gulpfile.mjs`
- Removed `d-` (dark) and `l-` (light) from all color utilities
- Removed `d-` prefix from **Bottom/Left/Right/Top** utilities
- Removed `d-1/2` **Dimension** utility
- Removed `dist/yumma-core.css` file
- Removed `dist/yumma-core.min.scss` file
- Removed `h-1/2` **Height** utility
- Removed `hidden` and `none` properties from **Text Decoration Style** utilities
- Removed `minifiedCoreFile()` function
- Removed `none` **Bottom/Left/Right/Top** invalid utilities
- Removed `w-1/2` **Width** utility
- Renamed `_color.scss` to `_create-colors.scss`
- Renamed `_core.scss` to `yummacss-core.scss`
- Renamed `_layout.scss` to `_positioning.scss`
- Renamed `gulpfile.js` to `gulpfile.mjs`
- Renamed `index.scss` to `yummacss.scss`
- Reworked **Box Model** utilities generation
- Updated **Columns** utilities syntax from `cols-*` to `c-*`
- Updated **Dimension** utilities syntax from `dim-*` to `d-*`
- Updated **Direction Bottom** utilities syntax from `dir-b-*` to `bo-*`
- Updated **Direction Inset** utilities syntax from `dir-i-*` to `i-*`
- Updated **Direction Left** utilities syntax from `dir-l-*` to `l-*`
- Updated **Direction Right** utilities syntax from `dir-r-*` to `r-*`
- Updated **Direction Top** utilities syntax from `dir-t-*` to `t-*`
- Updated **Direction** utilities to utilize `rem` as unit
- Updated **Float** utilities syntax from `flo-*` to `fl-*`
- Updated **Font Size** utilities syntax from `fs-b` to `fs-md`
- Updated **Max Dimension** utilities syntax from `max-dim-*` to `max-d-*`
- Updated **Min Dimension** utilities syntax from `min-dim-*` to `min-d-*`
- Updated **Overflow X** utilities syntax from `ovf-x-*` to `o-x-*`
- Updated **Overflow Y** utilities syntax from `ovf-y-*` to `o-y-*`
- Updated **Overflow** utilities syntax from `ovf-*` to `o-*`
- Updated `d-1/1` **Dimension** utility to `d-dvh`
- Updated `h-1/1` **Height** utility to `h-dvh`
- Updated `w-1/1` **Width** utility to `w-dvh`
- Updated color shade percentage from 10% to 14%
- Updated color utility generation logic
- Updated color utility range from 1-6 to 1-12

</details>

<details>
<summary>
    <b>Fixes</b>
</summary>

- Fixed responsive breakpoint utilities not overriding existent utilities [#2](https://github.com/yumma-lib/yumma-css/issues/2)
- Fixed duplicated utilities in `yumma.css` and `yumma.min.css` files [#3](https://github.com/yumma-lib/yumma-css/issues/3)

</details>
