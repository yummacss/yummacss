# Changelog

All notable changes to the Yumma CSS will be documented in this file.

## [2.2.0]

### Added

- Add `_color-utilities.scss`, `_create-utilities.scss`, `_extend-utilities.scss` and `_scale-utilities.scss` partial files
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
- Rename `src\abstracts\mixins\_color.scss` to `src\abstracts\mixins\_color-utils.scss`
- Rename `yummacss-cli` file to `yumma-cli`
- Rename the `*-variants()` mixins to `*-scaling()`
- Rework **Box Model** utilities generation

### Removed

- Remove `coreFile()` function
- Remove `minifiedCoreFile()` function
- Remove `yumma-core.css` file
- Remove `yumma-core.min.scss` file
