# Changelog

All notable changes to the Yumma CSS will be documented in this file.

## [2.2.0]

### Added

- Add `_create-utilities.scss`, `_extend-utilities.scss` and `_scale-utilities.scss` files
- Add `$yma-box-shadow-*` variables
- Add `src\abstracts\mixins\_color.scss` partial file
- Add `yummacss.config.js` file
- Add Yumma CSS CLI

### Changes

- Distribution files optimization
- Globally replace the keyword `@import` with `@use`
- Merge **Filters** and **Effects** subcategories into a **FX** category
- Move  `yumma-cli` to `bin\yumma-cli.js`
- New Core functionality to `yummacss.config.js` config file
- Rename `_base.scss` to `base\stylecent.scss`
- Rename `_core.scss` to `core.scss`
- Rename `_extensions.scss` to `_maps.scss`
- Rename `src\abstracts\mixins\_color.scss` to `src\abstracts\mixins\_color-utils.scss`
- Rename `yummacss-cli` file to `yumma-cli`
- Rename the `*-variants()` mixins to `*-scaling()`

### Removed

- None
