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
- Added **Box Decoration Break** utilities
- Added **Clear** utilities
- Added **Direction (Axis)** utilities
- Added **Field Sizing** utilities
- Added **Fill** utilities
- Added **Font Family** fallbacks
- Added **Grayscale** utilities
- Added **Isolation** utilities
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
- Added **Transform Origin** utilities
- Added **Translate** utilities
- Added **Vertical Align** utilities
- Added **Visibility** utilities
- Added **Whitespace** utilities
- Added `_create-colors.scss`, `_create-utilities.scss`, `_extend-utilities.scss` and `_scale-utilities.scss` partial files
- Added `_create-values.scss` file
- Added `_dimension.scss`, `_height.scss`, `_margin.scss`, `_padding.scss`, `_spacing.scss` and `_width.scss` files
- Added `_index.scss` files
- Added `$yma-box-shadow-*` variables
- Added `$yma-font-size-*` variables
- Added `no-reset.scss` file
- Added `full` and `half` values for **Direction** utilities
- Added `rad-b-*`, `rad-l-*`, `rad-r-*` and `rad-t` **Border Radius** utilities
- Added `src\abstracts\functions` folder
- Added `utilities\maps` folder
- Added `yummacss.config.js` file
- Added the `column-dense `and `row-dense` values for **Grid Auto Flow**
- Added Yumma CSS CLI

</details>

<details>

<summary>
    <b>Breaking changes</b>
</summary>

- Grouped related utilities and variants
- Included new and improved **Font Size** utilities
- Merged **Filters** and **Effects** subcategories into a **Effect** category
- Migrated base styles functionality to config file
- Migrated from `@import` to `@use` and `@forwards`
- Migrated from Common Js to ESM
- Migrated to Dart SCSS
- Moved `yumma-cli` to `bin\yumma-cli.js`
- Optimized `dist\yumma.css` file performance
- Optimized `dist\yumma.min.css` file performance
- Refactored **Bottom / Left / Right / Top** `d-` prefix utility syntax
- Removed `.cnt{}` utility class
- Removed `.ins{}` utility class
- Removed `coreFile()` function
- Removed `d-` and `l-` from color utilities
- Removed `dist\yumma-core.css` file
- Removed `dist\yumma-core.min.scss` file
- Removed `fs-b` utility class
- Removed `hidden` and `none` properties from **Text Decoration Style** utilities
- Removed `minifiedCoreFile()` function
- Removed the font-size variable variants
- Rename `yummacss-cli` file to `yumma-cli`
- Rename the `*-variants()` mixins to `*-scaling()`
- Renamed `_base.scss` to `base\_stylecent.scss`
- Renamed `_core.scss` to `no-reset.scss`
- Renamed `_functions.scss` to `_ignore-neutral.scss`
- Renamed `_layout.scss` to `_positioning.scss`
- Renamed `gulpfile.js` file name to `gulpfile.mjs`
- Renamed `index.scss` to `yummacss.scss`
- Renamed `src\abstracts\mixins\_color.scss` to `src\abstracts\mixins\_create-colors.scss`
- Reworked **Box Model** utilities generation
- Updated **Columns** utilities syntax from `cols-*` to `c-*`
- Updated **Dimension** utilities syntax from `dim-*` to `d-*`
- Updated **Direction Bottom** utilities syntax from `dir-b-*` to `bo-*`
- Updated **Direction Inset** utilities syntax from `dir-i-*` to `i-*`
- Updated **Direction Left** utilities syntax from `dir-l-*` to `l-*`
- Updated **Direction Right** utilities syntax from `dir-r-*` to `r-*`
- Updated **Direction Top** utilities syntax from `dir-t-*` to `t-*`
- Updated **Direction** utilities to utilize rem as unit
- Updated **Max Dimension** utilities syntax from `max-dim-*` to `max-d-*`
- Updated **Min Dimension** utilities syntax from `min-dim-*` to `min-d-*`
- Updated **Overflow X** utilities syntax from `ovf-x-*` to `o-x-*`
- Updated **Overflow Y** utilities syntax from `ovf-y-*` to `o-y-*`
- Updated **Overflow** utilities syntax from `ovf-*` to `o-*`
- Updated **Spacing X** utilities syntax from `s-x-*` to `sx-*`
- Updated **Spacing Y** utilities syntax from `s-y-*` to `sy-*`
- Updated color generation logic
- Updated color shade percentage from 10% to 14%
- Updated color utility range from 1-6 to 1-12

</details>

<details>
<summary>
    <b>Fixes</b>
</summary>

- Fixed responsive breakpoint utilities not overriding existent utilities [#2](https://github.com/yumma-lib/yumma-css/issues/2)
- Fixed duplicated utilities in `yumma.css` and `yumma.min.css` files [#3](https://github.com/yumma-lib/yumma-css/issues/3)

</details>
