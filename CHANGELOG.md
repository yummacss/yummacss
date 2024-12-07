# Changelog

All notable changes to the Yumma CSS will be documented in this file.

## [3.0.0]

### Added

- Add **Background Clip** utilities
- Add **Background Origin** utilities
- Add **Background Position** utilities
- Add **Background Repeat** utilities
- Add **Background Size** utilities
- Add **Border Spacing** utilities
- Add **Margin Block End** utilities
- Add **Margin Block Start** utilities
- Add **Margin Inline End** utilities
- Add **Margin Inline Start** utilities
- Add **Padding Block End** utilities
- Add **Padding Block Start** utilities
- Add **Padding Inline End** utilities
- Add **Padding Inline Start** utilities
- Add **Place Content** utilities
- Add **Place Items** utilities
- Add **Place Self** utilities
- Add **Order** utilities
- Add **Blur** utilities
- Add **Box Decoration Break** utilities
- Add **Grayscale** utilities
- Add **Clear** utilities
- Add **Isolation** utilities
- Add **Fill** utilities
- Add `_color-utilities.scss`, `_create-utilities.scss`, `_extend-utilities.scss` and `_scale-utilities.scss` partial files
- Add `_dimension.scss`, `_height.scss`, `_margin.scss`, `_padding.scss`, `_spacing.scss` and `_width.scss` files
- Add `_create-values.scss` file
- Add `$yma-box-shadow-*` variables
- Add `coreless.scss` file
- Add `src\abstracts\functions` folder
- Add `yummacss.config.js` file
- Add multiple `_index.scss` files
- Add Yumma CSS CLI
- Add `utilities\maps` folder

### Changes

- Distribution files optimization
- Globally replace the keyword `@import` with `@use`
- Group media queries.
- Group pseudo-class variants.
- Merge **Filters** and **Effects** subcategories into a **FX** category
- Migrate from Common Js to ESM
- Migrate Stylecent functionality to config file
- Move `yumma-cli` to `bin\yumma-cli.js`
- Optimize `dist\yumma.css` file performance
- Optimize `dist\yumma.min.css` file performance
- Rename `_base.scss` to `base\stylecent.scss`
- Rename `_core.scss` to `core.scss`
- Rename `_extensions.scss` to `_maps.scss`
- Rename `_functions.scss` to `_ignore-neutral.scss`
- Rename `gulpfile.js` file name to `gulpfile.mjs`
- Rename `src\abstracts\_layout.scss` to `src\abstracts\_container.scss`
- Rename `src\abstracts\mixins\_color.scss` to `src\abstracts\mixins\_color-utils.scss`
- Rename `yummacss-cli` file to `yumma-cli`
- Rename the `*-variants()` mixins to `*-scaling()`
- Rework **Box Model** utilities generation
- Update color shade percentage from `10%` to `14%`
- Update font size initial value from `0.75rem` to `0.25rem`

### Removed

- Remove `.ins{}` utility class
- Remove `coreFile()` function
- Remove `dist\yumma-core.css` file
- Remove `dist\yumma-core.min.scss` file
- Remove `fs-b` utility class
- Remove `minifiedCoreFile()` function
- Remove the font-size variable variants