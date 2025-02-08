# Changelog

All notable changes to the Yumma CSS will be documented in this file.

## Changelog for 3.0.0 🎉

<details>
<summary>
    <b>Features</b>
</summary>

- Add **Background Attachment** utilities
- Add **Background Clip** utilities
- Add **Background Origin** utilities
- Add **Background Position** utilities
- Add **Background Repeat** utilities
- Add **Background Size** utilities
- Add **Blur** utilities
- Add **Border Spacing** utilities
- Add **Box Decoration Break** utilities
- Add **Clear** utilities
- Add **Direction (Axis)** utilities
- Add **Fill** utilities
- Add **Font Family** fallbacks
- Add **Grayscale** utilities
- Add **Isolation** utilities
- Add **Letter Spacing** utilities
- Add **List Style Position** utilities
- Add **Margin Block End** utilities
- Add **Margin Block Start** utilities
- Add **Margin Inline End** utilities
- Add **Margin Inline Start** utilities
- Add **Order** utilities
- Add **Padding Block End** utilities
- Add **Padding Block Start** utilities
- Add **Padding Inline End** utilities
- Add **Padding Inline Start** utilities
- Add **Place Content** utilities
- Add **Place Items** utilities
- Add **Place Self** utilities
- Add **Rotate** utilities
- Add **Scale** utilities
- Add **Scroll Behavior** utilities
- Add **Scroll Margin Bottom** utilities
- Add **Scroll Margin Inline End** utilities
- Add **Scroll Margin Inline Start** utilities
- Add **Scroll Margin Left** utilities
- Add **Scroll Margin Right** utilities
- Add **Scroll Margin Top** utilities
- Add **Scroll Margin X** utilities
- Add **Scroll Margin Y** utilities
- Add **Scroll Margin** utilities
- Add **Scroll Snap Align** utilities
- Add **Scroll Snap Stop** utilities
- Add **Scroll Snap Type** utilities
- Add **Skew** utilities
- Add **Stroke Width** utilities
- Add **Stroke** utilities
- Add **Text Indent** utilities
- Add **Text Overflow** utilities
- Add **Text Transform** utilities
- Add **Text Underline Offset** utilities
- Add **Text Wrap** utilities
- Add **Transform Origin** utilities
- Add **Transition Delay** utilities
- Add **Transition Duration** utilities
- Add **Transition Property** utilities
- Add **Translate** utilities
- Add **Vertical Align** utilities
- Add **Visibility** utilities
- Add **Whitespace** utilities
- Add `_create-colors.scss`, `_create-utilities.scss`, `_extend-utilities.scss` and `_scale-utilities.scss` partial files
- Add `_create-values.scss` file
- Add `_dimension.scss`, `_height.scss`, `_margin.scss`, `_padding.scss`, `_spacing.scss` and `_width.scss` files
- Add `_index.scss` files
- Add `$yma-box-shadow-*` variables
- Add `$yma-font-size-*` variables
- Add `no-reset.scss` file
- Add `full` and `half` values for **Direction** utilities
- Add `rad-b-*` and `rad-t` **Border Radius** utilities
- Add `src\abstracts\functions` folder
- Add `utilities\maps` folder
- Add `yummacss.config.js` file
- Add the `column-dense `and `row-dense` values for **Grid Auto Flow**
- Add Yumma CSS CLI

</details>

<details>

<summary>
    <b>Breaking changes</b>
</summary>

- Group related utilities and variants
- Include new and improved **Font Size** utilities
- Merge **Filters** and **Effects** subcategories into a **Effect** category
- Migrate base styles functionality to config file
- Migrate from `@import` to `@use` and `@forwards`
- Migrate from Common Js to ESM
- Migrate to Dart SCSS
- Move `yumma-cli` to `bin\yumma-cli.js`
- Optimize `dist\yumma.css` file performance
- Optimize `dist\yumma.min.css` file performance
- Refactor **Bottom / Left / Right / Top** `d-` prefix utility syntax
- Remove `.cnt{}` utility class
- Remove `.ins{}` utility class
- Remove `coreFile()` function
- Remove `d-` and `l-` from color utilities
- Remove `dist\yumma-core.css` file
- Remove `dist\yumma-core.min.scss` file
- Remove `fs-b` utility class
- Remove `minifiedCoreFile()` function
- Remove the font-size variable variants
- Rename `_base.scss` to `base\_stylecent.scss`
- Rename `_core.scss` to `no-reset.scss`
- Rename `_functions.scss` to `_ignore-neutral.scss`
- Rename `gulpfile.js` file name to `gulpfile.mjs`
- Rename `index.scss` to `yummacss.scss`
- Rename `src\abstracts\_layout.scss` to `src\abstracts\_container.scss`
- Rename `src\abstracts\mixins\_color.scss` to `src\abstracts\mixins\_create-colors.scss`
- Rename `yummacss-cli` file to `yumma-cli`
- Rename the `*-variants()` mixins to `*-scaling()`
- Rework **Box Model** utilities generation
- Update **Columns** utilities syntax from `cols-*` to `c-*`
- Update **Dimension** utilities syntax from `dim-*` to `d-*`
- Update **Direction Bottom** utilities syntax from `dir-b-*` to `bo-*`
- Update **Direction Inset** utilities syntax from `dir-i-*` to `i-*`
- Update **Direction Left** utilities syntax from `dir-l-*` to `l-*`
- Update **Direction Right** utilities syntax from `dir-r-*` to `r-*`
- Update **Direction Top** utilities syntax from `dir-t-*` to `t-*`
- Update **Direction** utilities to utilize rem as unit
- Update **Max Dimension** utilities syntax from `max-dim-*` to `max-d-*`
- Update **Min Dimension** utilities syntax from `min-dim-*` to `min-d-*`
- Update **Spacing X** utilities syntax from `s-x-*` to `sx-*`
- Update **Spacing Y** utilities syntax from `s-y-*` to `sy-*`
- Update color generation logic
- Update color shade percentage from 10% to 14%
- Update color utility range from 1-6 to 1-12

</details>

<details>
<summary>
    <b>Fixes</b>
</summary>

- Fixed responsive breakpoint utilities not overriding existent utilities [#2](https://github.com/yumma-lib/yumma-css/issues/2)
- Fixed duplicated utilities in `yumma.css` and `yumma.min.css` files [#3](https://github.com/yumma-lib/yumma-css/issues/3)

</details>
