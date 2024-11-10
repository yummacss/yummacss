# Changelog

All notable changes to the Yumma CSS will be documented in this file.

## [2.2.0]

### Added

- Add `$yma-box-shadow-*` variables
- Add `src\abstracts\mixins\_color.scss` partial file
- Add `yummacss.config.js` file
- Add Yumma CSS CLI

### Changes

- Merge **Filters** and **Effects** subcategories into a **FX** category
- Rename `_extensions.scss` to `_maps.scss`
- Rename the `*-variants()` mixins to `*-scaling()`
- Rename `_base.scss` to `_core.scss`
- Move Core functionality to `yummacss.config.js` config file
- Fix duplicated utility classes like: `mx-auto`, 

### Removed

- Remove `yumma-core.css` and `yumma-core.min.css` from the `/dist` folder
- Remove `_base.scss` file
